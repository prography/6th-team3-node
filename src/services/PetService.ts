// Database 접근하기
import { BaseService } from './BaseService';
import { PrismaClient } from '@prisma/client';
import { PetData } from '../controllers/PetController';
import { DuplicatedPetNameError } from '../errors/PetError';

type Gender = 'MALE' | 'FEMAIL';

export class PetService extends BaseService {
  private databaseClient: PrismaClient;

  constructor() {
    super();
    this.databaseClient = new PrismaClient();
  }

  public async getUserPet(userId: number) {
    const userPets = await this.databaseClient.pet.findMany({
      where: { userId },
    });
    const result = [];
    for (const info of userPets) {
      const petInfo: PetData = {
        petName: info.name!,
        registerNumber: info.registerNum!,
        rfidCode: info.rfidCode!,
        year: info.year!.toString(),
        breed: info.breed!,
        isNeutered: info.isNeutered!.toString(),
        gender: info.gender!,
        weight: info.weight!,
      };
      result.push(petInfo);
    }
    return result;
  }

  public async createUserPet(userId: number, petData: PetData) {
    const duplicated = await this.databaseClient.pet.findMany({
      where: { userId },
    });
    for (const pet of duplicated) {
      if (pet.name === petData.petName) throw new DuplicatedPetNameError();
    }
    petData.gender = petData.gender === '수컷' ? 'MALE' : 'FEMAIL';
    const result = await this.databaseClient.pet.create({
      data: {
        name: petData.petName,
        registerNum: petData.registerNumber,
        rfidCode: petData.rfidCode,
        breed: petData.breed,
        isNeutered: petData.isNeutered === 'true',
        gender: petData.gender as Gender,
        year: parseInt(petData.year),
        owner: { connect: { id: userId } },
      },
    });
    return result;
  }
}
