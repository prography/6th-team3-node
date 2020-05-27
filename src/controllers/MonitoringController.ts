import { BaseController } from './BaseController';
import { PrismaClient } from '@prisma/client';
import {
  JsonController,
  Get,
  Post,
  BodyParam,
  Param,
  HttpError,
  Delete,
  Put,
} from 'routing-controllers';

import Logger from '../loaders/logger';

@JsonController('/hotels/:hotelId/monitorings')
export class MonitoringController extends BaseController {
  private databaseClient: PrismaClient;
  constructor() {
    super();
    this.databaseClient = new PrismaClient();
  }
  @Get()
  public async hotelMonitorings(@Param('hotelId') hotelId: number) {
    try {
      const monitorings = await this.databaseClient.monitoring.findMany({
        where: { hotelId: Number(hotelId) },
      });
      return monitorings;
    } catch (e) {
      if (e instanceof HttpError) Logger.info(e);
    }
  }

  @Get('/:monitoringId')
  public async hotelMonitoring(@Param('monitoringId') monitoringId: number) {
    try {
      const monitoring = await this.databaseClient.monitoring.findOne({
        where: { id: Number(monitoringId) },
      });
      return monitoring;
    } catch (e) {
      if (e instanceof HttpError) Logger.info(e);
    }
  }

  @Post()
  public async createHotelMonitoring(
    @Param('hotelId') hotelId: number,
    @BodyParam('name') name: string
  ) {
    try {
      return this.databaseClient.monitoring.create({
        data: {
          name,
          hotel: {
            connect: { id: Number(hotelId) },
          },
        },
      });
    } catch (e) {
      if (e instanceof HttpError) Logger.info(e);
    }
  }
  @Put('/:monitoringId')
  public async updateHotelMonitoring(
    @Param('hotelId') hotelId: number,
    @Param('monitoringId') monitoringId: number,
    @BodyParam('name') name: string
  ) {
    try {
      return this.databaseClient.monitoring.update({
        where: { id: Number(monitoringId) },
        data: {
          name,
          hotel: {
            connect: { id: Number(hotelId) },
          },
        },
      });
    } catch (e) {
      if (e instanceof HttpError) Logger.info(e);
    }
  }
  @Delete('/:monitoringId')
  public async deleteHotelMonitoring(
    @Param('monitoringId') monitoringId: number
  ) {
    try {
      const deleteHotelMonitoring = await this.databaseClient.monitoring.delete(
        {
          where: { id: Number(monitoringId) },
        }
      );
      return deleteHotelMonitoring;
    } catch (e) {
      if (e instanceof HttpError) Logger.info(e);
    }
  }
}
