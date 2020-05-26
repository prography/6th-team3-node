// Database 접근하기
import { BaseService } from './BaseService';
import { PrismaClient } from '@prisma/client';
import { UserToken, UserInfo } from '../providers/KakaoProvider';

type Provider = 'KAKAO' | 'NAVER' | 'GOOGLE' | 'FACEBOOK';

export class UserService extends BaseService {
  private databaseClient: PrismaClient;

  constructor() {
    super();
    this.databaseClient = new PrismaClient();
  }

  public async firstCreate(
    userInfo: UserInfo,
    userToken: UserToken,
    provider: Provider
  ) {
    const result = await this.databaseClient.user.create({
      data: {
        email: userInfo.email,
        accessToken: userToken.accessToken,
        refreshToken: userToken.refreshToken,
        provider: provider,
      },
    });
    console.log(result);
  }

  public async findUser(email: string) {
    const result = await this.databaseClient.user.findOne({
      where: { email },
    });
    console.log(39, result);
    if (result === null) return false;
    return true;
  }
}
