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
        birthYear: info.year!.toString(),
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
    petData.gender = petData.gender === '수컷' ? 'MALE' : 'FEMAIL';
    let result;
    try {
      result = await this.databaseClient.pet.create({
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
    } catch (e) {
      throw new 
    }

    /*
    const photoResult = await this.databaseClient.photo.create({
      data: {
        url: data.photoUrl,
        target: 'PET',
        targetId: petResult.id,
      },
    });
    const result = { ...petResult, ...photoResult };
    */
    return result;
  }
}
