import { BaseController } from './BaseController';
import { signJwtToken } from '../utils/AuthHelper';
import { JsonController, Get, Post, Body } from 'routing-controllers';
import { UserService } from '../services/UserService';

export interface SignUpData {
  nickname: string;
  phoneNumber: string;
  profileImage: string;
  password?: string;
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
  public index() {
    return 'Hello! This is user👱🏻‍♀️ page';
  }
  //TODO: 닉네임 중복확인
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
    const token = signJwtToken(signUpUser);
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
