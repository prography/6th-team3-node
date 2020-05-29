// Database 접근하기
import { BaseService } from './BaseService';
import { PrismaClient } from '@prisma/client';
import { SignUpData } from '../controllers/UserController';
import { UserToken, UserInfo } from '../providers/KakaoProvider';

type Provider = 'KAKAO' | 'NAVER' | 'GOOGLE' | 'FACEBOOK';

export class UserService extends BaseService {
  private databaseClient: PrismaClient;

  constructor() {
    super();
    this.databaseClient = new PrismaClient();
  }

  public async createUser(
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

  public async updateSignUpData(userId: number, signUpData: SignUpData) {
    const result = await this.databaseClient.user.update({
      where: { id: userId },
      data: {
        name: signUpData.nickname,
        phoneNumber: signUpData.phoneNumber,
        password: signUpData.password,
      },
    });
    console.log(44, result);
    return result;
  }

  public async findUser(email: string) {
    const result = await this.databaseClient.user.findOne({
      where: { email },
    });
    console.log(39, result);
    return result;
  }
}
