import { BaseService } from './BaseService';
import { PrismaClient } from '@prisma/client';
import { ServiceData, ServiceEditData } from '../controllers/ServiceController';

export class ServiceService extends BaseService {
  private databaseClient: PrismaClient;

  constructor() {
    super();
    this.databaseClient = new PrismaClient();
  }

  public async getHotelServices(hotelId: number) {
    const result = await this.databaseClient.service.findMany({
      where: { hotelId: Number(hotelId) },
    });
    return result;
  }

  public async createHotelService(hotelId: number, data: ServiceData) {
    const result = await this.databaseClient.service.create({
      data: {
        name: data.name,
        hotel: { connect: { id: hotelId } },
      },
    });
    return result;
  }

  public async editHotelService(hotelId: number, data: ServiceEditData) {
    const result = await this.databaseClient.service.update({
      where: { id: data.id },
      data: {
        name: data.name,
        hotel: { connect: { id: hotelId } },
      },
    });
    return result;
  }

  public async deleteHotelService(serviceId: number) {
    const result = await this.databaseClient.service.delete({
      where: { id: Number(serviceId) },
    });
  }
}
