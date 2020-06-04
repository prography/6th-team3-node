// Database 접근하기
import { BaseService } from './BaseService';
import { PrismaClient } from '@prisma/client';
import config from '../config';
// import AWS from 'aws-sdk';

export class PhotoService extends BaseService {
  private databaseClient: PrismaClient;
  // private s3: AWS.S3;

  constructor() {
    super();
    this.databaseClient = new PrismaClient();
    /*
    this.s3 = new AWS.S3({
      accessKeyId: config.auth.aws.accessKey,
      secretAccessKey: config.auth.aws.secretKey,
      region: 'ap-northeast-2',
    });
    */
  }
  /*
  public async uploadPhotoS3(category: string, photo: any) {
    // s3Params['key'];
  }
  */
}
