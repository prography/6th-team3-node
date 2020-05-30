import { BaseController } from './BaseController';
import { UserNotFoundError } from '../errors/UserError';

import jwtMiddleware, { signJwtToken, JwtUserData } from '../utils/AuthHelper';
import {
  JsonController,
  Get,
  Post,
  Body,
  UseBefore,
  BodyParam,
} from 'routing-controllers';
import { UserService } from '../services/UserService';

export interface SignUpData {
  nickname: string;
  phoneNumber: string;
  profileImage: string;
  password?: string;
}

export interface UserData {
  id: number;
  name: string;
  nickname: string;
  phoneNumber: string;
  // profileImage: string;
}

export interface SignUpRequest {
  userId: number;
  data: SignUpData;
}

export interface JwtSignUpResponse {
  status: string;
  message: string;
  data: {
    token: string;
  };
}

@JsonController('/user')
export class UserController extends BaseController {
  private userService: UserService;
  constructor() {
    super();
    this.userService = new UserService();
  }

  @Get()
  @UseBefore(jwtMiddleware)
  public async index(@BodyParam('user') user: JwtUserData) {
    //TODO: header로 온 JWT validation
    // const jwtData = decodeJwtToken(authToken);
    const userData = await this.userService.findUserByEmail(user.email);
    if (!userData) throw new UserNotFoundError(user.email);
    console.log(48, userData);

    //TODO: profile photo logic 구현하기
    const response: UserData = {
      id: userData.id,
      name: userData.name!,
      nickname: userData.name!,
      phoneNumber: userData.phoneNumber!,
      // profileImage:
    };
    return response;
  }

  //TODO: 닉네임 중복확인, PUT/PATCH으로 처리해야하나?
  //TODO: signUpData에 모든 정보가 들어왔는지 Validation check
  @Post('/')
  public async createUser(@Body() signUpData: string) {
    // TODO: signUpData validation check
    const bodyData = JSON.parse(JSON.stringify(signUpData));
    const id = bodyData.userId;
    const data = bodyData.data;
    const signUpUser = await this.userService.updateSignUpData(id, data);
    if (!signUpUser) {
      //TODO: Database error handling
    }
    const token = signJwtToken(signUpUser.id, signUpUser.email);
    const response: JwtSignUpResponse = {
      status: 'success',
      message: 'Success New User Creation',
      data: {
        token,
      },
    };
    return response;
  }
}
