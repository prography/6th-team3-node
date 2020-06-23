import { BaseService } from './BaseService';
import { PrismaClient, Payment } from '@prisma/client';
import { ReservationData } from '../controllers/ReservationController';

export class ReservationService extends BaseService {
  private databaseClient: PrismaClient;

  constructor() {
    super();
    this.databaseClient = new PrismaClient();
  }

  public async getReservations(hotelId: number) {
    const result = await this.databaseClient.reservation.findMany({
      where: {
        hotelId: Number(hotelId),
      },
    });
    console.log(32, result);
    return result;
  }

  public async getReservationPayment(reservationId: number) {
    const result = await this.databaseClient.payment.findMany({
      where: {
        reservationId: Number(reservationId),
      },
    });
    console.log(32, result);
    return result;
  }

  public async createReservation(
    hotelId: number,
    userId: number,
    data: ReservationData
  ) {
    const result = await this.databaseClient.reservation.create({
      data: {
        pet: { connect: { id: Number(data.petId) } },
        hotel: { connect: { id: Number(hotelId) } },
        user: { connect: { id: Number(userId) } },
        startDate: data.startDate,
        endDate: data.endDate,
        pickupTime: data.pickupTime,
        request: data.request,
      },
    });
    console.log(32, result);
    return result;
  }

  public async createReservationPayment(reservationId: number, data: Payment) {
    const result = await this.databaseClient.payment.create({
      data: {
        name: data.name,
        reservation: { connect: { id: Number(reservationId) } },
      },
    });
    console.log(32, result);
    return result;
  }

  public async editReservation(
    reservationId: number,
    hotelId: number,
    userId: number,
    data: ReservationData
  ) {
    const result = await this.databaseClient.reservation.update({
      where: { id: Number(reservationId) },
      data: {
        pet: { connect: { id: Number(data.petId) } },
        hotel: { connect: { id: Number(hotelId) } },
        user: { connect: { id: Number(userId) } },
        startDate: data.startDate,
        endDate: data.endDate,
        pickupTime: data.pickupTime,
        request: data.request,
      },
    });
    console.log(32, result);
    return result;
  }

  public async updateReservationPayment(reservationId: number, data: Payment) {
    //console.log(data.id);
    const result = await this.databaseClient.payment.update({
      where: { id: data.id },
      data: {
        name: data.name,
        //reservation: { connect: { id: Number(reservationId) } },
      },
    });
    console.log(32, result);
    return result;
  }

  public async deleteReservationPayment(paymentId: number) {
    const result = await this.databaseClient.payment.delete({
      where: {
        id: Number(paymentId),
      },
    });
  }

  public async deleteReservation(reservationId: number) {
    const result = await this.databaseClient.reservation.delete({
      where: {
        id: Number(reservationId),
      },
    });
    return result;
  }
}
