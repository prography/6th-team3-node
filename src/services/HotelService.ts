import { BaseService } from './BaseService';
import { PrismaClient, Price } from '@prisma/client';
import { HotelData } from '../controllers/HotelController';

export class HotelService extends BaseService {
  private databaseClient: PrismaClient;

  constructor() {
    super();
    this.databaseClient = new PrismaClient();
  }

  public async createHotel(data: HotelData) {
    const result = await this.databaseClient.hotel.create({
      data: {
        name: data.name,
        description: data.description,
        address: data.address,
        addressDetail: data.addressDetail,
        zipcode: data.zipcode,
        latitude: data.latiude,
        longitude: data.longitude,
        weekOpenTime: data.weekOpenTime,
        weekCloseTime: data.weekCloseTime,
        satOpenTime: data.satOpenTime,
        satCloseTime: data.satCloseTime,
        sunOpenTime: data.sunOpenTime,
        sunCloseTime: data.sunCloseTime,
        phoneNumber: data.phoneNumber,
        monitorAvailable: data.monitorAvailable,
        isNeuteredOnly: data.isNeuteredOnly,
        maxDogSize: data.maxDogSize,
        pageLink: data.pageLink,
        mediumCriteria: data.mediumCriteria,
        largeCriteria: data.largeCriteria,
      },
    });
    console.log(32, result);
    return result;
  }

  public async editHotel(hotelId: number, data: HotelData) {
    const result = await this.databaseClient.hotel.update({
      where: { id: Number(hotelId) },
      data: {
        name: data.name,
        description: data.description,
        address: data.address,
        addressDetail: data.addressDetail,
        zipcode: data.zipcode,
        latitude: data.latiude,
        longitude: data.longitude,
        weekOpenTime: data.weekOpenTime,
        weekCloseTime: data.weekCloseTime,
        satOpenTime: data.satOpenTime,
        satCloseTime: data.satCloseTime,
        sunOpenTime: data.sunOpenTime,
        sunCloseTime: data.sunCloseTime,
        phoneNumber: data.phoneNumber,
        monitorAvailable: data.monitorAvailable,
        isNeuteredOnly: data.isNeuteredOnly,
        maxDogSize: data.maxDogSize,
        pageLink: data.pageLink,
        mediumCriteria: data.mediumCriteria,
        largeCriteria: data.largeCriteria,
      },
    });
    //console.log(32, result);
    return result;
  }

  public async createHotelPrice(hotelId: number, data: Price) {
    const result = await this.databaseClient.price.create({
      data: {
        day: data.day,
        weight: data.weight,
        size: data.size,
        price: data.price,
        hotel: { connect: { id: hotelId } },
      },
    });
    console.log(32, result);
    return result;
  }

  public async updateHotelPrice(hotelId: number, data: Price) {
    const result = await this.databaseClient.price.update({
      where: { id: data.id },
      data: {
        day: data.day,
        weight: data.weight,
        size: data.size,
        price: data.price,
        hotel: { connect: { id: hotelId } },
      },
    });
    console.log(32, result);
    return result;
  }

  public async getHotelPrice(hotelId: number) {
    const result = await this.databaseClient.price.findMany({
      where: {
        hotel: {
          id: hotelId,
        },
      },
    });
    //console.log(32, result);
    return result;
  }
}
