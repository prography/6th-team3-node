import { BaseController } from './BaseController';
import {
  JsonController,
  Get,
  Post,
  Param,
  QueryParam,
  Redirect,
  BodyParam,
} from 'routing-controllers';
import { signJwtToken, checkPassword } from '../utils/AuthHelper';
import config from '../config';
import { UserInfo, KakaoProvider } from '../providers/KakaoProvider';
import { UserService } from '../services/UserService';
// import { User } from '@prisma/client';
import { UserNotFoundError } from '../errors/UserError';
import { PasswordIncorrectError } from '../errors/AuthError';

export interface KakaoAuthResponse {
  status: string;
  message: string;
  data: {
    userId: number;
    information: UserInfo;
  };
}

export interface JwtSignInResponse {
  status: string;
  message: string;
  data: {
    token: string;
  };
}

@JsonController('/auth')
export class AuthController extends BaseController {
  private userService: UserService;
  constructor() {
    super();
    this.userService = new UserService();
  }

  @Post('/login')
  public async login(
    @BodyParam('email') email: string,
    @BodyParam('password') password: string
  ) {
    const user = await this.userService.findUserByEmail(email);
    if (user === null) throw new UserNotFoundError(email);
    const checkUser = await checkPassword(password, user.password!);
    if (checkUser === false) throw new PasswordIncorrectError();
    const token = signJwtToken(user.id!, user.email!);
    const response: JwtSignInResponse = {
      status: 'success',
      message: 'Success General Login',
      data: {
        token,
      },
    };
    return response;
  }

  @Get('/kakao/login')
  @Redirect(
    'https://kauth.kakao.com/oauth/authorize?client_id=:clientId&redirect_uri=:redirectUri&response_type=code'
  )
  public loginKakao() {
    return {
      clientId: config.auth.kakao.clientId,
      redirectUri: config.auth.kakao.redirect,
    };
  }

  @Get('/kakao/login/callback')
  @Redirect('/auth/kakao/code=:code')
  public kakaoCallback(@QueryParam('code') code: string) {
    return { code };
  }

  @Get('/kakao/code=:code')
  public async kakaoUserAuth(@Param('code') code: string) {
    const kakaoProvider = new KakaoProvider();
    console.log(58, code);
    const userToken = await kakaoProvider.getAccessToken(code);
    const userInfo = await kakaoProvider.getUserInfo(userToken);
    const checkUser = await this.userService.findUserByEmail(
      userInfo.email
    ); /*as User*/
    if (checkUser) {
      // 만약 이메일 조회했는데 해당 이메일로 가입된 유저가 있다? -> JWT 리턴, 가입된 유저라고 클라로 리턴보내기
      // throw new AlreadySignedUserError(userInfo.email);
      const token = signJwtToken(checkUser.id!, checkUser.email!);
      const response: JwtSignInResponse = {
        status: 'success',
        message: 'Success Kakao Login',
        data: {
          token,
        },
      };
      return response;
    }

    // 만약 이메일 조회했는데 해당 이메일로 가입된 유저가 없다?
    // -> OK, 카카오에서 받아온 정보들 클라로 리턴

    // TODO: firstCreate 실패시 에러처리
    const newUser = await this.userService.createOauthUser(
      userInfo,
      userToken,
      'KAKAO'
    );

    const response: KakaoAuthResponse = {
      status: 'success',
      message: 'Success Kakao Authorization, Redirect To Sign In Page',
      data: {
        userId: newUser.id,
        information: userInfo,
      },
    };
    return response;
  }
}
