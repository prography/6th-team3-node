// Database 접근하기
import { BaseService } from './BaseService';
import { PrismaClient } from '@prisma/client';
import { PetData } from '../controllers/PetController';
import { PetRegisterData } from '../providers/PetProvider';

type Gender = 'MALE' | 'FEMAIL';

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
    const petResult = await this.databaseClient.pet.create({
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
    const photoResult = await this.databaseClient.photo.create({
      data: {
        url: data.photoUrl,
        target: 'PET',
        targetId: petResult.id,
      },
    });
    const result = { ...petResult, ...photoResult };
    return result;
  }
}
