import { BaseController } from './BaseController';
import { PrismaClient } from '@prisma/client';
import { getKakaoUserToken } from '../utils/AuthHelper';
import { UserToken } from '../interfaces/AuthInterface';
import Logger from '../loaders/logger';
import { JsonController, Get, QueryParam, Redirect } from 'routing-controllers';
// import config from '../config';

@JsonController('/oauth')
export class AuthController extends BaseController {
  private databaseClient: PrismaClient;
  constructor() {
    super();
    this.databaseClient = new PrismaClient();
  }

  @Get('/kakao/callback')
  public async kakaoCallback(@QueryParam('code') code: string) {
    //TODO: Login 취소에 대한 error=access_denied 처리하기
    //  const userToken: UserToken = getKakaoUserToken(code);
    let response;
    try {
      response = await getKakaoUserToken(code);
    } catch (e) {
      //TODO: HTTP Error 400
    }
    return response;
  }
}
