// Database 접근하기
import { BaseService } from './BaseService';
import { PrismaClient, Gender } from '@prisma/client';
import { PetData } from '../controllers/PetController';
import { PetRegisterData } from '../providers/PetProvider';

export class PetService extends BaseService {
  private databaseClient: PrismaClient;

  constructor() {
    super();
    this.databaseClient = new PrismaClient();
  }

  public async createUserPet(
    userId: number,
    data: PetData,
    registerData: PetRegisterData
  ) {
    const result = await this.databaseClient.pet.create({
      data: {
        name: data.petName,
        registerNum: registerData.registerNumber,
        rfidCode: registerData.rfidCode,
        breed: registerData.breed,
        isNeutered: registerData.isNeutered,
        gender: registerData.gender as Gender,
        year: data.birthYear,
        owner: { connect: { id: userId } },
      },
    });
    console.log(32, result);
    return result;
  }
}
