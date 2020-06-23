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
  Req,
  Body,
} from 'routing-controllers';

import Logger from '../loaders/logger';
import { ReservationService } from '../services/ReservationService';

export interface SignUpReservationRequest {
  userId: number;
  data: ReservationData[];
}

export interface SignUpReservationEditRequest {
  userId: number;
  data: ReservationData;
}

export interface ReservationData {
  petId: number;
  startDate: Date;
  endDate: Date;
  pickupTime: string;
  request: string;
  //payment: Payment;
}

export interface SignUpReservationResponse {
  status: number;
  message: string;
  data: any[];
}

export interface DeleteReservationRequest {
  userId: number;
}

export interface DeleteReservationResponse {
  status: number;
  message: string;
}

@JsonController('/reservations')
export class ReservationController extends BaseController {
  private databaseClient: PrismaClient;
  private reservationService: ReservationService;

  constructor() {
    super();
    this.databaseClient = new PrismaClient();
    this.reservationService = new ReservationService();
  }

  @Get()
  public async allreservations(@Req() req: any) {
    let getReservations: any;
    if (req.query.hotel_id) {
      getReservations = await this.reservationService.getReservationsHotel(
        req.query.hotel_id
      );
    } else if (req.query.user_id) {
      getReservations = await this.reservationService.getReservationsUser(
        req.query.user_id
      );
    }

    /*let info: any;
    for (info of getReservations) {
      const { id } = info;
      const reservationPayment = await this.reservationService.getReservationPayment(
        id
      );

      for (const pay of reservationPayment) {
        info.payment = pay;
      }
    }*/

    const response: SignUpReservationResponse = {
      status: 201,
      message: 'Success reservation get',
      data: getReservations,
    };

    return response;
  }
  @Post('/:hotelId')
  public async createReservation(
    @Param('hotelId') hotelId: number,
    @Body() reservationData: string
  ) {
    const bodyData: SignUpReservationRequest = JSON.parse(
      JSON.stringify(reservationData)
    );
    const { userId, data } = bodyData;
    const reservationInfo = [];

    for (const info of data) {
      const newReservation: any = await this.reservationService.createReservation(
        hotelId,
        userId,
        info
      );

      const reservation_id = JSON.parse(JSON.stringify(newReservation));
      const { id } = reservation_id; //reservation_id 파싱

      /*if (info.payment) {
        const newReservationPayment = await this.reservationService.createReservationPayment(
          id,
          info.payment
        );
        newReservation.payment = newReservationPayment;
      }*/
      reservationInfo.push(newReservation);
    }

    const response: SignUpReservationResponse = {
      status: 201,
      message: 'Success Reservation Creation',
      data: reservationInfo,
    };

    return response;
  }
  @Put('/:hotelId/:reservationId')
  public async updateReservation(
    @Param('hotelId') hotelId: number,
    @Param('reservationId') reservationId: number,
    @Body() reservationData: string
  ) {
    const bodyData: SignUpReservationEditRequest = JSON.parse(
      JSON.stringify(reservationData)
    );
    const { userId, data } = bodyData;

    const newReservation: any = await this.reservationService.editReservation(
      reservationId,
      hotelId,
      userId,
      data
    );

    /*if (data.payment) {
      const newReservationPayment = await this.reservationService.updateReservationPayment(
        reservationId,
        data.payment
      );
    }

    const reservationPayment = await this.reservationService.getReservationPayment(
      reservationId
    );

    for (const info of reservationPayment) {
      newReservation.payment = info;
    }*/

    const response: SignUpReservationResponse = {
      status: 201,
      message: 'Success Reservation edit',
      data: newReservation,
    };

    return response;
  }

  @Delete('/:hotelId/:reservationId')
  public async deleteReservation(
    @Param('hotelId') hotelId: number,
    @Param('reservationId') reservationId: number,
    @Body() reservationData: string
  ) {
    const bodyData: DeleteReservationRequest = JSON.parse(
      JSON.stringify(reservationData)
    );
    const { userId } = bodyData;

    /*const reservationPayment = await this.reservationService.getReservationPayment(
      reservationId
    );

    if (reservationPayment) {
      for (const info of reservationPayment) {
        const { id } = info;
        const deleteReservationPayment = await this.reservationService.deleteReservationPayment(
          id
        );
      }
    }*/

    const deleteReservation = await this.reservationService.deleteReservation(
      reservationId
    );

    const response: DeleteReservationResponse = {
      status: 201,
      message: 'Success Reservation Delete',
    };

    return response;
  }
}
