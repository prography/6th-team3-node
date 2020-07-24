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
import { MonitoringService } from '../services/MonitoringService';

export interface SignUpMonitoringRequest {
  hotelId: number;
  data: MonitoringData[];
}

export interface EditMonitoringRequest {
  hotelId: number;
  data: MonitoringEditData[];
}

export interface SignUpMonitoringResponse {
  status: number;
  message: string;
  data: any[];
}

export interface MonitoringData {
  name: string;
}

export interface MonitoringEditData {
  id: number;
  name: string;
}

@JsonController('/monitorings')
export class MonitoringController extends BaseController {
  private databaseClient: PrismaClient;
  private monitoringService: MonitoringService;
  constructor() {
    super();
    this.databaseClient = new PrismaClient();
    this.monitoringService = new MonitoringService();
  }
  @Get('/:hotelId')
  public async hotelMonitorings(@Param('hotelId') hotelId: number) {
    const hotelMonitoring = await this.monitoringService.getHotelMonitorings(
      hotelId
    );

    const response: SignUpMonitoringResponse = {
      status: 201,
      message: 'Success Hotel Monitoring get',
      data: hotelMonitoring,
    };
    return response;
  }

  /*@Get('/:monitoringId')
  public async hotelMonitoring(@Param('monitoringId') monitoringId: number) {
    try {
      const monitoring = await this.databaseClient.monitoring.findOne({
        where: { id: Number(monitoringId) },
      });
      return monitoring;
    } catch (e) {
      if (e instanceof HttpError) Logger.info(e);
    }
  }*/

  @Post()
  public async createHotelMonitoring(@Body() monitoringData: string) {
    const bodyData: SignUpMonitoringRequest = JSON.parse(
      JSON.stringify(monitoringData)
    );

    const { hotelId, data } = bodyData;
    const monitoringInfo = [];

    for (const info of data) {
      const newMonitoring = await this.monitoringService.createHotelMonitoring(
        hotelId,
        info
      );
      monitoringInfo.push(newMonitoring);
    }

    const response: SignUpMonitoringResponse = {
      status: 201,
      message: 'Success Hotel Monitoring Creation',
      data: monitoringInfo,
    };

    return response;
  }

  @Put()
  public async updateHotelMonitoring(@Body() monitoringData: string) {
    const bodyData: EditMonitoringRequest = JSON.parse(
      JSON.stringify(monitoringData)
    );

    const { hotelId, data } = bodyData;

    for (const info of data) {
      const newMonitoring = await this.monitoringService.editHotelMonitoring(
        hotelId,
        info
      );
    }

    const hotelMonitoring = await this.monitoringService.getHotelMonitorings(
      hotelId
    );

    const response: SignUpMonitoringResponse = {
      status: 201,
      message: 'Success Hotel Monitoring Edit',
      data: hotelMonitoring,
    };

    return response;
  }
  @Delete('/:hotelId/:monitoringId')
  public async deleteHotelMonitoring(
    @Param('hotelId') hotelId: number,
    @Param('monitoringId') monitoringId: number
  ) {
    const deleteHotelMonitoring = await this.monitoringService.deleteHotelMonitoring(
      monitoringId
    );

    const hotelMonitoring = await this.monitoringService.getHotelMonitorings(
      hotelId
    );

    const response: SignUpMonitoringResponse = {
      status: 201,
      message: 'Success Hotel Monitoring delete',
      data: hotelMonitoring,
    };

    return response;
  }
}
