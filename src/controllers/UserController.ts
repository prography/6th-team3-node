import express from 'express';
import { BaseController } from './BaseController';
import { UserNotFoundError } from '../errors/UserError';
import { UploadImageError } from '../errors/PhotoError';

import jwtMiddleware, { signJwtToken, JwtUserData } from '../utils/AuthHelper';
import {
  JsonController,
  Get,
  Post,
  Body,
  UseBefore,
  Req,
  UploadedFile,
} from 'routing-controllers';
import { UserService } from '../services/UserService';
import { PhotoService } from '../services/PhotoService';

export interface OauthSignUpData {
  nickname: string;
  phoneNumber: string;
  profileImage: string | PhotoUploadRequest;
}

export interface OauthSignUpRequest {
  userId: string;
  data: OauthSignUpData;
}

export interface GeneralSignUpData {
  nickname: string;
  phoneNumber: string;
  email: string;
  photoUrl?: string;
  password: string;
}

export interface GeneralSignUpRequest {
  data: GeneralSignUpData;
}

export interface UserData {
  id: number;
  name: string;
  phoneNumber: string;
  profileImage: string;
}

export interface JwtSignUpResponse {
  status: string;
  message: string;
  data: {
    token: string;
  };
}

export interface PhotoUploadRequest {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

//TODO: User 정보 수정(PUT) 그리고 탈퇴(DELETE) 구현
@JsonController('/user')
export class UserController extends BaseController {
  private userService: UserService;
  private photoService: PhotoService;

  constructor() {
    super();
    this.userService = new UserService();
    this.photoService = new PhotoService();
  }

  @Get('/')
  @UseBefore(jwtMiddleware)
  public async index(@Req() request: express.Request) {
    const user: JwtUserData = request.user;
    const userData = await this.userService.findUserByEmail(user.email);
    if (!userData) throw new UserNotFoundError(user.email);

    const photoData = await this.photoService.getUserPhoto(userData.id);
    const profileImage = !photoData ? 'empty' : photoData.url;

    const response: UserData = {
      id: userData.id,
      name: userData.name!,
      phoneNumber: userData.phoneNumber!,
      profileImage: profileImage!,
    };

    return response;
  }

  //TODO: 닉네임 중복확인
  //TODO: signUpData에 모든 정보가 들어왔는지 Validation check
  @Post('/')
  public async createUser(
    @Body() signUpData: string,
    @UploadedFile('profileImage') file: PhotoUploadRequest
  ) {
    if (file !== undefined && file.size > 1000000) {
      throw new UploadImageError();
    }
    // TODO: signUpData validation check
    const bodyData = JSON.parse(JSON.stringify(signUpData));
    const data = bodyData.data;
    const photo = data.profileImage === undefined ? file : data.profileImage;

    let signUpUser;

    console.log(111, photo);

    if (bodyData.userId === undefined) {
      signUpUser = await this.userService.createGeneralUser(data);
      if (photo !== undefined)
        await this.photoService.createUserPhoto(signUpUser.id, photo);
    } else {
      const id = parseInt(bodyData.userId);
      signUpUser = await this.userService.updateSignUpData(id, data);
      await this.photoService.createUserPhoto(signUpUser.id, photo);
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
