import { BaseService } from './BaseService';
import { PrismaClient } from '@prisma/client';
import {
  MonitoringData,
  MonitoringEditData,
} from '../controllers/MonitoringController';

export class MonitoringService extends BaseService {
  private databaseClient: PrismaClient;

  constructor() {
    super();
    this.databaseClient = new PrismaClient();
  }

  public async getHotelMonitorings(hotelId: number) {
    const result = await this.databaseClient.monitoring.findMany({
      where: { hotelId: Number(hotelId) },
    });
    return result;
  }

  public async createHotelMonitoring(hotelId: number, data: MonitoringData) {
    const result = await this.databaseClient.monitoring.create({
      data: {
        name: data.name,
        hotel: { connect: { id: hotelId } },
      },
    });
    return result;
  }

  public async editHotelMonitoring(hotelId: number, data: MonitoringEditData) {
    const result = await this.databaseClient.monitoring.update({
      where: { id: data.id },
      data: {
        name: data.name,
        hotel: { connect: { id: hotelId } },
      },
    });
    return result;
  }

  public async deleteHotelMonitoring(monitoringId: number) {
    const result = await this.databaseClient.monitoring.delete({
      where: { id: Number(monitoringId) },
    });
  }
}
