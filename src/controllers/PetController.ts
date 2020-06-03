import { BaseController } from './BaseController';
import { PrismaClient } from '@prisma/client';
import jwtMiddleware from '../utils/AuthHelper';
import { PetProvider } from '../providers/PetProvider';
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
  data: [PetData];
}

export interface PetData {
  petName: string;
  registerNumber: string;
  birthYear: number;
}

export interface SignUpPetResponse {
  status: string;
  message: string;
}

@JsonController('/pet')
export class PetController extends BaseController {
  private databaseClient: PrismaClient;
  private petService: PetService;
  constructor() {
    super();
    this.databaseClient = new PrismaClient();
    this.petService = new PetService();
  }
  @Get('/')
  public index() {
    return 'Hello! This is pets🐶 page';
  }
  @Post('/')
  @UseBefore(jwtMiddleware)
  public async createPet(@Body() petData: string) {
    const petProvider = new PetProvider();
    const bodyData: SignUpPetRequest = JSON.parse(JSON.stringify(petData));
    console.log(38, bodyData);
    const { userId, data } = bodyData;
    const petInfo = [];

    data.forEach(async info => {
      const newPet = this.petService.createUserPet(userId, info);
      // TODO: Database error 처리하기
    });

    /*TODO: 공공데이터포털에서 정보 가져오는 로직
    data.forEach(async info => {
      const registerData = await petProvider.getRegisterPetData(
        info.registerNumber,
        info.registerNumber
      );
      petInfo.push(registerData);
    });
    */

    const response: SignUpPetResponse = {
      status: 'success',
      message: 'Success User Pet Creation',
    };
    return response;
  }
}
