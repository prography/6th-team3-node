import { BaseController } from './BaseController';
import { PrismaClient } from '@prisma/client';
import {
  JsonController,
  Get,
  Param,
  QueryParam,
  Redirect,
} from 'routing-controllers';
import {} from '../utils/AuthHelper';
import config from '../config';
import { UserInfo, KakaoProvider } from '../providers/KakaoProvider';
import { UserService } from '../services/UserService';
import { AlreadySignedUserError } from '../errors/UserError';

// import config from '../config';

export interface KakaoAuthResponse {
  status: string;
  data: {
    provider: string;
    information: UserInfo;
  };
}

@JsonController('/auth')
export class AuthController extends BaseController {
  private userService: UserService;
  constructor() {
    super();
    this.userService = new UserService();
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
  @Redirect('/api/auth/kakao/code=:code')
  public kakaoCallback(@QueryParam('code') code: string) {
    return { code };
  }

  @Get('/kakao/code=:code')
  public async kakaoUserAuth(@Param('code') code: string) {
    const kakaoProvider = new KakaoProvider();
    console.log(58, code);
    const userToken = await kakaoProvider.getAccessToken(code);
    const userInfo = await kakaoProvider.getUserInfo(userToken);
    // 만약 이메일 조회했는데 해당 이메일로 가입된 유저가 있다? -> 가입된 유저라고 클라로 리턴보내기
    const checkSigned = await this.userService.findUser(userInfo.email);
    if (checkSigned) throw new AlreadySignedUserError(userInfo.email);
    // 만약 이메일 조회했는데 해당 이메일로 가입된 유저가 없다?
    // -> OK, 카카오에서 받아온 정보들 클라()로 리턴
    const newUser = await this.userService.firstCreate(
      userInfo,
      userToken,
      'KAKAO'
    );
    const response: KakaoAuthResponse = {
      status: 'success',
      data: {
        provider: 'kakao',
        information: userInfo,
      },
    };
    return response;
  }
}
