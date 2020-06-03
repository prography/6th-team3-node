// Database 접근하기
import { BaseService } from './BaseService';
import { PrismaClient } from '@prisma/client';
import { PetData } from '../controllers/PetController';

export class PetService extends BaseService {
  private databaseClient: PrismaClient;

  constructor() {
    super();
    this.databaseClient = new PrismaClient();
  }

  public async createUserPet(userId: number, data: PetData) {
    const result = await this.databaseClient.pet.create({
      data: {
        name: data.petName,
        registerNum: data.registerNumber,
        year: data.birthYear,
        owner: { connect: { id: userId } },
      },
    });
    console.log(23, result);
    return result;
  }
}
