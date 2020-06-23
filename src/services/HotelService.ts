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

  public async getHotels() {
    const result = await this.databaseClient.hotel.findMany();
    return result;
  }

  public async getHotelsName(namequery: string) {
    const result = await this.databaseClient.hotel.findMany({
      where: {
        name: {
          //이름으로 호텔 검색
          contains: namequery,
        },
      },
    });
    return result;
  }

  public async getHotelsAddress(addressquery: string) {
    const result = await this.databaseClient.hotel.findMany({
      where: {
        address: {
          //이름으로 호텔 검색
          contains: addressquery,
        },
      },
    });
    return result;
  }

  public async getHotelsTime(opentimequery: string, closetimequery: string) {
    const result = await this.databaseClient.hotel.findMany({
      where: {
        //오픈, 클로즈 시간으로 호텔 검색할 때 사용
        AND: [
          {
            weekOpenTime: {
              lte: opentimequery,
            },
          },
          {
            weekCloseTime: {
              gte: closetimequery,
            },
          },
        ],
      },
    });
    return result;
  }

  public async getHotelsService(servicequery: string) {
    const result = await this.databaseClient.hotel.findMany({
      where: {
        services: {
          some: {
            name: servicequery,
          },
        },
      },
      include: {
        services: {
          where: {
            name: servicequery,
          },
        },
      },
    });
    return result;
  }

  public async getHotelsMonitoring(monitoringquery: string) {
    const result = await this.databaseClient.hotel.findMany({
      where: {
        monitorings: {
          some: {
            name: monitoringquery,
          },
        },
      },
      include: {
        monitorings: {
          where: {
            name: monitoringquery,
          },
        },
      },
    });
    return result;
  }

  public async getHotel(hotelId: number) {
    const result = await this.databaseClient.hotel.findOne({
      where: {
        id: Number(hotelId),
      },
    });
    return result;
  }

  public async getHotelPrice(hotelId: number) {
    const result = await this.databaseClient.price.findMany({
      where: {
        hotel: {
          id: Number(hotelId),
        },
      },
    });
    //console.log(32, result);
    return result;
  }

  public async deleteHotel(hotelId: number) {
    const result = await this.databaseClient.hotel.delete({
      where: {
        id: Number(hotelId),
      },
    });
    return result;
  }

  public async deleteHotelPrice(priceId: number) {
    const result = await this.databaseClient.price.delete({
      where: {
        id: Number(priceId),
      },
    });
  }
}
