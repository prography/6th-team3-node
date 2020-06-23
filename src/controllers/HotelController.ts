import { BaseController } from './BaseController';
import { PrismaClient, Price } from '@prisma/client';
import {
  JsonController,
  Get,
  Post,
  Param,
  HttpError,
  Delete,
  Put,
  Req,
  Body,
} from 'routing-controllers';

import Logger from '../loaders/logger';
import { HotelService } from '../services/HotelService';
import { MonitoringService } from '../services/MonitoringService';
import { ServiceService } from '../services/ServiceService';
import { ReservationService } from '../services/ReservationService';

export interface SignUpHotelRequest {
  data: HotelData;
}

export interface SignUpHotelResponse {
  status: number;
  message: string;
  data: any[];
}

export interface DeleteHotelResponse {
  status: number;
  message: string;
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
  private monitoringService: MonitoringService;
  private serviceService: ServiceService;
  private reservationService: ReservationService;
  constructor() {
    super();
    this.databaseClient = new PrismaClient();
    this.hotelService = new HotelService();
    this.monitoringService = new MonitoringService();
    this.serviceService = new ServiceService();
    this.reservationService = new ReservationService();
  }
  @Get()
  public async allHotels(@Req() req: any) {
    let hotels: any;
    if (req.query.namequery) {
      //이름으로 호텔 검색
      hotels = await this.hotelService.getHotelsName(req.query.namequery);
    } else if (req.query.addressqury) {
      //주소로 호텔 검색
      hotels = await this.hotelService.getHotelsAddress(req.query.addressquery);
    } else if (req.query.opentimequery || req.query.closetimequery) {
      hotels = await this.hotelService.getHotelsTime(
        req.query.opentimequery,
        req.query.closetimequery
      );
    } else if (req.query.servicequery) {
      //서비스명으로 호텔 검색할 때 사용
      hotels = await this.hotelService.getHotelsService(req.query.servicequery);
    } else if (req.query.monitoringquery) {
      //모니터링명으로 호텔 검색할 때 사용
      hotels = await this.hotelService.getHotelsMonitoring(
        req.query.monitoringquery
      );
    } else {
      hotels = await this.hotelService.getHotels();
    }
    let info: any;
    for (info of hotels) {
      const { id } = info;
      const hotelsPrice = await this.hotelService.getHotelPrice(id);
      info.prices = hotelsPrice;
    }
    const response: SignUpHotelResponse = {
      status: 201,
      message: 'Success Hotels get',
      data: hotels,
    };

    return response;
  }
  @Get('/:hotelId')
  public async oneHotel(@Param('hotelId') hotelId: number) {
    const getHotel: any = await this.hotelService.getHotel(hotelId);
    const hotel_id = JSON.parse(JSON.stringify(getHotel));
    const { id } = hotel_id; //hotel_id 파싱
    const hotelPrice = await this.hotelService.getHotelPrice(id);

    getHotel.prices = hotelPrice;

    const response: SignUpHotelResponse = {
      status: 201,
      message: 'Success Hotel get',
      data: getHotel,
    };

    return response;
  }
  @Post()
  public async createHotel(@Body() hotelData: string) {
    const bodyData: SignUpHotelRequest = JSON.parse(JSON.stringify(hotelData));
    const { data } = bodyData;
    const priceData = JSON.parse(JSON.stringify(data));

    const priceInfo = [];

    const newHotel: any = await this.hotelService.createHotel(data);

    const hotel_id = JSON.parse(JSON.stringify(newHotel));
    const { id } = hotel_id; //hotel_id 파싱

    if (data.prices) {
      const { prices } = priceData; //price 파싱
      for (const info of prices) {
        const newHotelPrice = await this.hotelService.createHotelPrice(
          id,
          info
        );
        priceInfo.push(newHotelPrice);
      }
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
    //console.log(newHotel);
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
  //TODO: cascade delete 구현하기
  @Delete('/:hotelId')
  public async deleteHotel(@Param('hotelId') hotelId: number) {
    const hotelPrice = await this.hotelService.getHotelPrice(hotelId);
    const hotelMonitoring = await this.monitoringService.getHotelMonitorings(
      hotelId
    );
    const hotelService = await this.serviceService.getHotelServices(hotelId);
    const reservation = await this.reservationService.getReservations(hotelId);

    if (hotelPrice) {
      for (const info of hotelPrice) {
        const { id } = info;
        const deleteHotelPrice = await this.hotelService.deleteHotelPrice(id);
      }
    }
    if (hotelMonitoring) {
      for (const info of hotelMonitoring) {
        const { id } = info;
        const deleteHotelMonitoring = await this.monitoringService.deleteHotelMonitoring(
          id
        );
      }
    }
    if (hotelService) {
      for (const info of hotelService) {
        const { id } = info;
        const deleteHotelService = await this.serviceService.deleteHotelService(
          id
        );
      }
    }
    if (reservation) {
      for (const info of reservation) {
        const { id } = info;
        const reservationPayment = await this.reservationService.getReservationPayment(
          id
        );
        if (reservationPayment) {
          for (const info of reservationPayment) {
            const { id } = info;
            const deleteReservationPayment = await this.reservationService.deleteReservationPayment(
              id
            );
          }
        }
        const deleteReservation = await this.reservationService.deleteReservation(
          id
        );
      }
    }

    const deleteHotel = await this.hotelService.deleteHotel(hotelId);

    const response: DeleteHotelResponse = {
      status: 201,
      message: 'Success Hotel Delete',
    };

    return response;
  }
}
