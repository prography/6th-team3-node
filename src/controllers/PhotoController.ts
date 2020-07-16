import { BaseController } from './BaseController';
import { JsonController, Post, UploadedFile } from 'routing-controllers';
import { NotSupportedTypeError, UploadImageError } from '../errors/PhotoError';
import { PhotoService } from '../services/PhotoService';
export interface PhotoUploadRequest {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

export interface PhotoData {
  category: string;
  url: string;
}
export interface PhotoUploadResponse {
  status: string;
  message: string;
  data: PhotoData;
}

@JsonController('/photo')
export class PhotoController extends BaseController {
  private allowedMimeTypes: string[];
  private photoService: PhotoService;
  constructor() {
    super();
    this.allowedMimeTypes = ['image/png', 'image/jpeg', 'image/bmp'];
    this.photoService = new PhotoService();
  }

  @Post('/user')
  public async userPhotoUpload(@UploadedFile('file') file: PhotoUploadRequest) {
    console.log(20, file);
    if (!this.allowedMimeTypes.includes(file.mimetype))
      throw new NotSupportedTypeError(file.mimetype);
    const upload = await this.photoService.uploadPhotoS3('user', file);
    if (upload instanceof Error) throw new UploadImageError();
    const photoInfo: PhotoData = {
      category: 'user',
      url: upload['Location']!,
    };
    const response: PhotoUploadResponse = {
      status: 'success',
      message: 'Success User Photo Upload',
      data: photoInfo,
    };
    return response;
  }

  @Post('/pet')
  public async petPhotoUpload(@UploadedFile('file') file: PhotoUploadRequest) {
    if (!this.allowedMimeTypes.includes(file.mimetype))
      throw new NotSupportedTypeError(file.mimetype);
    const upload = await this.photoService.uploadPhotoS3('pet', file);
    if (upload instanceof Error) throw new UploadImageError();
    const photoInfo: PhotoData = {
      category: 'pet',
      url: upload['Location']!,
    };
    const response: PhotoUploadResponse = {
      status: 'success',
      message: 'Success Pet Photo Upload',
      data: photoInfo,
    };
    return response;
  }

  @Post('/hotel')
  public async hotelPhotoUpload(
    @UploadedFile('file') file: PhotoUploadRequest
  ) {
    if (!this.allowedMimeTypes.includes(file.mimetype))
      throw new NotSupportedTypeError(file.mimetype);
    const upload = await this.photoService.uploadPhotoS3('hotel', file);
    if (upload instanceof Error) throw new UploadImageError();
    const photoInfo: PhotoData = {
      category: 'hotel',
      url: upload['Location']!,
    };
    const response: PhotoUploadResponse = {
      status: 'success',
      message: 'Success Hotel Photo Upload',
      data: photoInfo,
    };
    return response;
  }
}
