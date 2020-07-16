import express from 'express';
import { BaseController } from './BaseController';
import { PrismaClient } from '@prisma/client';
import jwtMiddleware, { JwtUserData } from '../utils/AuthHelper';
import { PetProvider, PetRegisterData } from '../providers/PetProvider';
import { PetService } from '../services/PetService';
import { NotRegisteredPetError } from '../errors/PetError';
import {
  JsonController,
  Get,
  Post,
  UseBefore,
  Body,
  UploadedFiles,
  Req,
} from 'routing-controllers';
export interface SignUpPetRequest {
  data: PetData[];
}

export interface PetData {
  petName: string;
  registerNumber: string;
  rfidCode: string;
  birthYear: string;
  breed: string;
  isNeutered: string;
  gender: string;
}

export interface PetResponse {
  status: string;
  message: string;
  data: any | any[];
}

export interface PhotoUploadRequest {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

@JsonController('/pet')
export class PetController extends BaseController {
  private databaseClient: PrismaClient;
  private petService: PetService;
  private petProvider: PetProvider;
  constructor() {
    super();
    this.databaseClient = new PrismaClient();
    this.petService = new PetService();
    this.petProvider = new PetProvider();
  }
  @Get('/')
  public index() {
    return 'Hello! This is pets🐶 page';
  }

  @Post('/')
  @UseBefore(jwtMiddleware)
  public async createPet(
    @UploadedFiles('photo') files: File[],
    @Body() data: PetData[],
    @Req() request: express.Request
  ) {
    const petData: PetData[] = JSON.parse(JSON.stringify(data))['data'];
    const userInfo: JwtUserData = request.user;

    const petInfo = [];

    for (const info of petData) {
      console.log(79, userInfo);
      const newPet = await this.petService.createUserPet(userInfo.id, info);

      petInfo.push(newPet);
    }

    const response: PetResponse = {
      status: 'success',
      message: 'Success User Pet Creation',
      data: petInfo,
    };

    return response;
  }

  @Post('/check')
  public async checkPet(@Body() petData: PetData) {
    const { registerNumber } = petData;
    const registerData: PetRegisterData = await this.petProvider.getRegisterPetData(
      registerNumber
    );
    if (!registerData) throw new NotRegisteredPetError();

    const response: PetResponse = {
      status: 'success',
      message: 'Success check registered pet',
      data: registerData,
    };

    return response;
  }
}
