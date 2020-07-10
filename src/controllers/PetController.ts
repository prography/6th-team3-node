import { BaseController } from './BaseController';
import { PrismaClient } from '@prisma/client';
import jwtMiddleware from '../utils/AuthHelper';
import { PetProvider, PetRegisterData } from '../providers/PetProvider';
import { PetService } from '../services/PetService';
import {
  JsonController,
  Get,
  Post,
  UseBefore,
  Body,
} from 'routing-controllers';
export interface SignUpPetRequest {
  userId: number;
  data: PetData[];
}

export interface PetData {
  petName: string;
  registerNumber: string;
  birthYear: number;
  photoUrl: string;
}

export interface SignUpPetResponse {
  status: string;
  message: string;
  data: any[];
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
    // TODO: userId JWT decode해서 가져오는 게 나을까?
    return 'Hello! This is pets🐶 page';
  }

  @Post('/')
  @UseBefore(jwtMiddleware)
  public async createPet(@Body() petData: string) {
    const bodyData: SignUpPetRequest = JSON.parse(JSON.stringify(petData));

    // TODO: userId JWT decode해서 가져오는 게 나을까?
    const { userId, data } = bodyData;
    const petInfo = [];

    for (const info of data) {
      const registerData: PetRegisterData = await this.petProvider.getRegisterPetData(
        info.registerNumber
      );
      const newPet = await this.petService.createUserPet(
        userId,
        info,
        registerData
      );
      petInfo.push(newPet);
    }

    const response: SignUpPetResponse = {
      status: 'success',
      message: 'Success User Pet Creation',
      data: petInfo,
    };

    return response;
  }
}
