import { BaseController } from './BaseController';
import { PrismaClient } from '@prisma/client';
import {
  JsonController,
  Get,
  Post,
  BodyParam,
  Param,
  HttpError,
} from 'routing-controllers';

import Logger from '../loaders/logger';

@JsonController('/hotels')
export class HotelController extends BaseController {
  private databaseClient: PrismaClient;
  constructor() {
    super();
    this.databaseClient = new PrismaClient();
  }
  @Get()
  public async allHotels() {
    try {
      const hotels = await this.databaseClient.hotel.findMany();
      return hotels;
    } catch (e) {
      if (e instanceof HttpError) Logger.info(e);
    }
  }
  @Get('/:hotelId')
  public async oneHotel(@Param('hotelId') hotelId: number) {
    try {
      const hotel = await this.databaseClient.hotel.findOne({
        where: { id: Number(hotelId) },
      });
      return hotel;
    } catch (e) {
      if (e instanceof HttpError) Logger.info(e);
    }
  }
}
