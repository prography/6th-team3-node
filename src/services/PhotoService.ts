// Database 접근하기
import { BaseService } from './BaseService';
import { PrismaClient } from '@prisma/client';
import { PhotoUploadRequest } from '../controllers/PhotoController';
import { NotSupportedTypeError, UploadImageError } from '../errors/PhotoError';
import config from '../config';
import moment from 'moment';
import AWS from 'aws-sdk';

type Target = 'PET' | 'USER' | 'HOTEL';

export class PhotoService extends BaseService {
  private databaseClient: PrismaClient;
  private allowedMimeTypes: string[];
  private S3: AWS.S3;

  constructor() {
    super();
    this.databaseClient = new PrismaClient();
    this.allowedMimeTypes = ['image/png', 'image/jpeg', 'image/bmp'];
    this.S3 = new AWS.S3({
      accessKeyId: config.auth.aws.accessKey,
      secretAccessKey: config.auth.aws.secretKey,
      region: 'ap-northeast-2',
    });
  }

  public async uploadPhotoS3(
    category: string,
    photo: PhotoUploadRequest
  ): Promise<AWS.S3.Types.CompleteMultipartUploadOutput> {
    const key = moment().format('YYYYMMDDhhmmss');
    const params: AWS.S3.Types.PutObjectRequest = {
      Bucket: `mypetmily-photo/${category}`,
      Key: key,
      ACL: 'public-read',
      Body: photo.buffer,
      ContentType: photo.mimetype,
    };
    return new Promise((resolve, reject) => {
      this.S3.upload(params, (err, data) => {
        if (err) reject(err);
        return resolve(data);
      });
    });
  }

  public async getUserPhoto(userId: number) {
    const target: Target = 'USER';
    // TODO: 사진 수정 미구현
    const result = await this.databaseClient.photo.findMany({
      where: { target, targetId: userId },
    });
    console.log(52, result[result.length - 1]);
    return result[result.length - 1];
  }

  public async createPetPhoto(petId: number, file: PhotoUploadRequest) {
    if (!this.allowedMimeTypes.includes(file.mimetype))
      throw new NotSupportedTypeError(file.mimetype);

    const upload = await this.uploadPhotoS3('pet', file);

    if (upload instanceof Error) throw new UploadImageError();

    const result = await this.databaseClient.photo.create({
      data: {
        target: 'PET',
        targetId: petId,
        url: upload['Location'],
      },
    });

    return { photoUrl: result.url };
  }

  public async createUserPhoto(
    userId: number,
    file: PhotoUploadRequest | string
  ) {
    if (typeof file === 'string') {
      const result = await this.databaseClient.photo.create({
        data: {
          target: 'USER',
          targetId: userId,
          url: file,
        },
      });
      return result;
    }

    if (!this.allowedMimeTypes.includes(file.mimetype))
      throw new NotSupportedTypeError(file.mimetype);

    const upload = await this.uploadPhotoS3('user', file);

    if (upload instanceof Error) throw new UploadImageError();

    const result = await this.databaseClient.photo.create({
      data: {
        target: 'USER',
        targetId: userId,
        url: upload['Location'],
      },
    });

    return { photoUrl: result.url };
  }
}
