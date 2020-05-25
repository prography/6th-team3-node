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
  @Post()
  public async createHotel(
    @BodyParam('name') name: string,
    @BodyParam('description') description: string,
    @BodyParam('address') address: string,
    @BodyParam('addressDetail') addressDetail: string,
    @BodyParam('zipcode') zipcode: string,
    @BodyParam('latitude') latitude: number,
    @BodyParam('longitude') longitude: number,
    @BodyParam('weekOpenTime') weekOpenTime: Date,
    @BodyParam('weekCloseTime') weekCloseTime: Date,
    @BodyParam('satOpenTime') satOpenTime: Date,
    @BodyParam('satCloseTime') satCloseTime: Date,
    @BodyParam('sunOpenTime') sunOpenTime: Date,
    @BodyParam('sunCloseTime') sunCloseTime: Date,
    @BodyParam('weekPrice') weekPrice: number,
    @BodyParam('satPrice') satPrice: number,
    @BodyParam('sunPrice') sunPrice: number,
    @BodyParam('phoneNumber') phoneNumber: string,
    @BodyParam('monitorAvailable') monitorAvailable: boolean,
    @BodyParam('isNeuteredOnly') isNeuteredOnly: boolean,
    @BodyParam('maxDogSize') maxDogSize: number,
    @BodyParam('pageLink') pageLink: string
  ) {
    try {
      return this.databaseClient.hotel.create({
        data: {
          name,
          description,
          address,
          addressDetail,
          zipcode,
          latitude,
          longitude,
          weekOpenTime,
          weekCloseTime,
          satOpenTime,
          satCloseTime,
          sunOpenTime,
          sunCloseTime,
          weekPrice,
          satPrice,
          sunPrice,
          phoneNumber,
          monitorAvailable,
          isNeuteredOnly,
          maxDogSize,
          pageLink,
        },
      });
    } catch (e) {
      if (e instanceof HttpError) Logger.info(e);
    }
  }
  @Put('/:hotelId')
  public async updateHotel(
    @Param('hotelId') hotelId: number,
    @BodyParam('name') name: string,
    @BodyParam('description') description: string,
    @BodyParam('address') address: string,
    @BodyParam('addressDetail') addressDetail: string,
    @BodyParam('zipcode') zipcode: string,
    @BodyParam('latitude') latitude: number,
    @BodyParam('longitude') longitude: number,
    @BodyParam('weekOpenTime') weekOpenTime: Date,
    @BodyParam('weekCloseTime') weekCloseTime: Date,
    @BodyParam('satOpenTime') satOpenTime: Date,
    @BodyParam('satCloseTime') satCloseTime: Date,
    @BodyParam('sunOpenTime') sunOpenTime: Date,
    @BodyParam('sunCloseTime') sunCloseTime: Date,
    @BodyParam('weekPrice') weekPrice: number,
    @BodyParam('satPrice') satPrice: number,
    @BodyParam('sunPrice') sunPrice: number,
    @BodyParam('phoneNumber') phoneNumber: string,
    @BodyParam('monitorAvailable') monitorAvailable: boolean,
    @BodyParam('isNeuteredOnly') isNeuteredOnly: boolean,
    @BodyParam('maxDogSize') maxDogSize: number,
    @BodyParam('pageLink') pageLink: string
  ) {
    try {
      return this.databaseClient.hotel.update({
        where: { id: Number(hotelId) },
        data: {
          name,
          description,
          address,
          addressDetail,
          zipcode,
          latitude,
          longitude,
          weekOpenTime,
          weekCloseTime,
          satOpenTime,
          satCloseTime,
          sunOpenTime,
          sunCloseTime,
          weekPrice,
          satPrice,
          sunPrice,
          phoneNumber,
          monitorAvailable,
          isNeuteredOnly,
          maxDogSize,
          pageLink,
        },
      });
    } catch (e) {
      if (e instanceof HttpError) Logger.info(e);
    }
  }
  @Delete('/:hotelId')
  public async deleteHotel(@Param('hotelId') hotelId: number) {
    try {
      const deleteHotel = await this.databaseClient.hotel.delete({
        where: { id: Number(hotelId) },
      });
      return deleteHotel;
    } catch (e) {
      if (e instanceof HttpError) Logger.info(e);
    }
  }
}
