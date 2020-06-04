import { BaseController } from './BaseController';
import { JsonController, Post, UploadedFile } from 'routing-controllers';
import { NotSupportedTypeError } from '../errors/PhotoError';
import { PhotoService } from '../services/PhotoService';
import express from 'express';

// import Express from 'express';

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
  public async userPhotoUpload(@UploadedFile('file') file: any) {
    console.log(20, file);
    if (!this.allowedMimeTypes.includes(file.mimetype))
      throw new NotSupportedTypeError(file.mimetype);
    // const upload = this.photoService.uploadPhotoS3()
  }
}
