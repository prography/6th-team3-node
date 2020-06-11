import { BaseController } from './BaseController';
import { PrismaClient, Price } from '@prisma/client';
import {
  JsonController,
  Get,
  Post,
  BodyParam,
  Param,
  HttpError,
  Delete,
  Put,
  Req,
  Body,
} from 'routing-controllers';

import Logger from '../loaders/logger';
import { HotelService } from '../services/HotelService';

export interface SignUpHotelRequest {
  data: HotelData;
}

export interface SignUpHotelResponse {
  status: number;
  message: string;
  data: any[];
}

export interface HotelData {
  name: string;
  description: string;
  address: string;
  addressDetail: string;
  zipcode: string;
  latiude: number;
  longitude: number;
  weekOpenTime: string;
  weekCloseTime: string;
  satOpenTime: string;
  satCloseTime: string;
  sunCloseTime: string;
  sunOpenTime: string;
  phoneNumber: string;
  monitorAvailable: boolean;
  isNeuteredOnly: boolean;
  maxDogSize: number;
  pageLink: string;
  mediumCriteria: number;
  largeCriteria: number;
  prices: Price[];
}

@JsonController('/hotels')
export class HotelController extends BaseController {
  private databaseClient: PrismaClient;
  private hotelService: HotelService;
  constructor() {
    super();
    this.databaseClient = new PrismaClient();
    this.hotelService = new HotelService();
  }
  @Get()
  public async allHotels(@Req() req: any) {
    try {
      let hotels;
      if (req.query.searchquery) {
        hotels = await this.databaseClient.hotel.findMany({
          where: {
            OR: [
              {
                name: {
                  //이름으로 호텔 검색
                  contains: req.query.searchquery,
                },
              },
              {
                address: {
                  //주소로 호텔 검색
                  contains: req.query.searchquery,
                },
              },
            ],
          },
        });
      } else if (req.query.opentimequery || req.query.closetimequery) {
        hotels = await this.databaseClient.hotel.findMany({
          where: {
            //오픈, 클로즈 시간으로 호텔 검색할 때 사용
            AND: [
              {
                weekOpenTime: {
                  lte: req.query.opentimequery,
                },
              },
              {
                weekCloseTime: {
                  gte: req.query.closetimequery,
                },
              },
            ],
          },
        });
      } else if (req.query.servicequery) {
        //서비스명으로 호텔 검색할 때 사용
        hotels = await this.databaseClient.hotel.findMany({
          where: {
            services: {
              some: {
                name: req.query.servicequery,
              },
            },
          },
          include: {
            services: {
              where: {
                name: req.query.servicequery,
              },
            },
          },
        });
      } else if (req.query.monitoringquery) {
        //모니터링명으로 호텔 검색할 때 사용
        hotels = await this.databaseClient.hotel.findMany({
          where: {
            monitorings: {
              some: {
                name: req.query.monitoringquery,
              },
            },
          },
          include: {
            monitorings: {
              where: {
                name: req.query.monitoringquery,
              },
            },
          },
        });
      } else {
        hotels = await this.databaseClient.hotel.findMany();
      }
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
  public async createHotel(@Body() hotelData: string) {
    const bodyData: SignUpHotelRequest = JSON.parse(JSON.stringify(hotelData));
    const { data } = bodyData;
    const priceData = JSON.parse(JSON.stringify(data));
    const { prices } = priceData; //price 파싱
    const priceInfo = [];

    const newHotel: any = await this.hotelService.createHotel(data);

    const hotel_id = JSON.parse(JSON.stringify(newHotel));
    const { id } = hotel_id; //hotel_id 파싱

    for (const info of prices) {
      const newHotelPrice = await this.hotelService.createHotelPrice(id, info);
      priceInfo.push(newHotelPrice);
    }
    newHotel.prices = priceInfo;

    const response: SignUpHotelResponse = {
      status: 201,
      message: 'Success Hotel Creation',
      data: newHotel,
    };

    return response;
  }
  @Put('/:hotelId')
  public async updateHotel(
    @Param('hotelId') hotelId: number,
    @Body() hotelData: string
  ) {
    const bodyData: SignUpHotelRequest = JSON.parse(JSON.stringify(hotelData));
    const { data } = bodyData;
    const priceData = JSON.parse(JSON.stringify(data));

    const newHotel: any = await this.hotelService.editHotel(hotelId, data);

    const hotel_id = JSON.parse(JSON.stringify(newHotel));
    const { id } = hotel_id; //hotel_id 파싱

    if (data.prices) {
      const { prices } = priceData; //price 파싱
      for (const info of prices) {
        const newHotelPrice = await this.hotelService.updateHotelPrice(
          id,
          info
        );
      }
    }

    const hotelPrice = await this.hotelService.getHotelPrice(id);
    newHotel.prices = hotelPrice;

    const response: SignUpHotelResponse = {
      status: 201,
      message: 'Success Hotel edit',
      data: newHotel,
    };

    return response;
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
