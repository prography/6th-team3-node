import { BaseController } from './BaseController';
import { PrismaClient } from '@prisma/client';
import {
  JsonController,
  Get,
  Post,
  Param,
  HttpError,
  Delete,
  Put,
  Body,
} from 'routing-controllers';

import Logger from '../loaders/logger';
import { ServiceService } from '../services/ServiceService';

export interface SignUpServiceRequest {
  hotelId: number;
  data: ServiceData[];
}

export interface EditServiceRequest {
  hotelId: number;
  data: ServiceEditData[];
}

export interface SignUpServiceResponse {
  status: number;
  message: string;
  data: any[];
}

export interface ServiceData {
  name: string;
}

export interface ServiceEditData {
  id: number;
  name: string;
}

@JsonController('/services')
export class ServiceController extends BaseController {
  private databaseClient: PrismaClient;
  private serviceService: ServiceService;
  constructor() {
    super();
    this.databaseClient = new PrismaClient();
    this.serviceService = new ServiceService();
  }

  @Get('/:hotelId')
  public async hotelServices(@Param('hotelId') hotelId: number) {
    const hotelService = await this.serviceService.getHotelServices(hotelId);

    const response: SignUpServiceResponse = {
      status: 201,
      message: 'Success Hotel Service get',
      data: hotelService,
    };
    return response;
  }

  /*@Get('/:serviceId')
  public async hotelService(@Param('serviceId') serviceId: number) {
    try {
      const service = await this.databaseClient.service.findOne({
        where: { id: Number(serviceId) },
      });
      return service;
    } catch (e) {
      if (e instanceof HttpError) Logger.info(e);
    }
  }*/

  @Post()
  public async createHotelService(@Body() serviceData: string) {
    const bodyData: SignUpServiceRequest = JSON.parse(
      JSON.stringify(serviceData)
    );

    const { hotelId, data } = bodyData;
    const serviceInfo = [];

    for (const info of data) {
      const newService = await this.serviceService.createHotelService(
        hotelId,
        info
      );
      serviceInfo.push(newService);
    }

    const response: SignUpServiceResponse = {
      status: 201,
      message: 'Success Hotel Service Creation',
      data: serviceInfo,
    };

    return response;
  }

  @Put()
  public async updateHotelService(@Body() serviceData: string) {
    const bodyData: EditServiceRequest = JSON.parse(
      JSON.stringify(serviceData)
    );

    const { hotelId, data } = bodyData;

    for (const info of data) {
      const newService = await this.serviceService.editHotelService(
        hotelId,
        info
      );
    }

    const hotelService = await this.serviceService.getHotelServices(hotelId);

    const response: SignUpServiceResponse = {
      status: 201,
      message: 'Success Hotel Service Edit',
      data: hotelService,
    };

    return response;
  }

  @Delete('/:hotelId/:serviceId')
  public async deleteHotelService(
    @Param('hotelId') hotelId: number,
    @Param('serviceId') serviceId: number
  ) {
    const deleteHotelService = await this.serviceService.deleteHotelService(
      serviceId
    );

    const hotelService = await this.serviceService.getHotelServices(hotelId);

    const response: SignUpServiceResponse = {
      status: 201,
      message: 'Success Hotel Service delete',
      data: hotelService,
    };

    return response;
  }
}
