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

@JsonController('/hotels/:hotelId/services')
export class ServiceController extends BaseController {
  private databaseClient: PrismaClient;
  constructor() {
    super();
    this.databaseClient = new PrismaClient();
  }
  @Get()
  public async hotelServices(@Param('hotelId') hotelId: number) {
    try {
      const services = await this.databaseClient.service.findMany({
        where: { hotelId: Number(hotelId) },
      });
      return services;
    } catch (e) {
      if (e instanceof HttpError) Logger.info(e);
    }
  }

  @Get('/:serviceId')
  public async hotelService(@Param('serviceId') serviceId: number) {
    try {
      const service = await this.databaseClient.service.findOne({
        where: { id: Number(serviceId) },
      });
      return service;
    } catch (e) {
      if (e instanceof HttpError) Logger.info(e);
    }
  }

  @Post()
  public async createHotelService(
    @Param('hotelId') hotelId: number,
    @BodyParam('name') name: string
  ) {
    try {
      return this.databaseClient.service.create({
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
  @Put('/:serviceId')
  public async updateHotelService(
    @Param('hotelId') hotelId: number,
    @Param('serviceId') serviceId: number,
    @BodyParam('name') name: string
  ) {
    try {
      return this.databaseClient.service.update({
        where: { id: Number(serviceId) },
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
  @Delete('/:serviceId')
  public async deleteHotelService(@Param('serviceId') serviceId: number) {
    try {
      const deleteHotelService = await this.databaseClient.service.delete({
        where: { id: Number(serviceId) },
      });
      return deleteHotelService;
    } catch (e) {
      if (e instanceof HttpError) Logger.info(e);
    }
  }
}
