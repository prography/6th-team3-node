// Database 접근하기
import { BaseService } from './BaseService';
import { PrismaClient } from '@prisma/client';
import {
  OauthSignUpData,
  GeneralSignUpData,
} from '../controllers/UserController';
import { UserToken, UserInfo } from '../providers/KakaoProvider';
import { hashPassword } from '../utils/AuthHelper';

type Provider = 'KAKAO' | 'NAVER' | 'GOOGLE' | 'FACEBOOK';

export class UserService extends BaseService {
  private databaseClient: PrismaClient;

  constructor() {
    super();
    this.databaseClient = new PrismaClient();
  }

  public async createGeneralUser(signUpData: GeneralSignUpData) {
    const { nickname, phoneNumber, email, password } = signUpData;
    const safePassword = await hashPassword(password);
    console.log(password, safePassword);
    const result = await this.databaseClient.user.create({
      data: {
        name: nickname,
        phoneNumber: phoneNumber,
        email: email,
        password: safePassword,
      },
    });
    return result;
  }

  public async createOauthUser(
    userInfo: UserInfo,
    userToken: UserToken,
    provider: Provider
  ) {
    // 바뀔 수 없는 것에 대해서만 저장
    const result = await this.databaseClient.user.create({
      data: {
        email: userInfo.email,
        accessToken: userToken.accessToken,
        refreshToken: userToken.refreshToken,
        provider: provider,
      },
    });
    return result;
  }

  public async updateSignUpData(userId: number, signUpData: OauthSignUpData) {
    const result = await this.databaseClient.user.update({
      where: { id: userId },
      data: {
        name: signUpData.nickname,
        phoneNumber: signUpData.phoneNumber,
      },
    });
    console.log(44, result);
    return result;
  }

  public async findUserByEmail(email: string) {
    const result = await this.databaseClient.user.findOne({
      where: { email },
    });
    return result;
  }
}
