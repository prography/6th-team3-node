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

  public async createUserPet(userId: number, petData: PetData) {
    petData.gender = petData.gender === '수컷' ? 'MALE' : 'FEMAIL';
    const result = await this.databaseClient.pet.create({
      data: {
        name: petData.petName,
        registerNum: petData.registerNumber,
        rfidCode: petData.rfidCode,
        breed: petData.breed,
        isNeutered: petData.isNeutered === 'true',
        gender: petData.gender as Gender,
        year: parseInt(petData.birthYear),
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
