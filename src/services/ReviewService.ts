import { BaseService } from './BaseService';
import { PrismaClient } from '@prisma/client';
import { ReviewData } from '../controllers/ReviewController';

export class ReviewService extends BaseService {
  private databaseClient: PrismaClient;

  constructor() {
    super();
    this.databaseClient = new PrismaClient();
  }

  public async getReviews(hotelId: number) {
    const result = await this.databaseClient.review.findMany({
      where: {
        hotelId: Number(hotelId),
      },
    });
    console.log(32, result);
    return result;
  }

  public async getReview(hotelId: number, reviewId: number) {
    const result = await this.databaseClient.review.findMany({
      where: {
        id: Number(reviewId),
      },
    });
    console.log(32, result);
    return result;
  }

  public async createreview(userId: number, hotelId: number, data: ReviewData) {
    const result = await this.databaseClient.review.create({
      data: {
        user: { connect: { id: Number(userId) } },
        hotel: { connect: { id: Number(hotelId) } },
        rating: data.rating,
        content: data.content,
      },
    });
    console.log(32, result);
    return result;
  }

  public async editReview(
    userId: number,
    hotelId: number,
    reviewId: number,
    data: ReviewData
  ) {
    const result = await this.databaseClient.review.update({
      where: { id: Number(reviewId) },
      data: {
        user: { connect: { id: Number(userId) } },
        hotel: { connect: { id: Number(hotelId) } },
        rating: data.rating,
        content: data.content,
      },
    });
    console.log(32, result);
    return result;
  }

  public async deleteReview(reviewId: number) {
    const result = await this.databaseClient.review.delete({
      where: {
        id: Number(reviewId),
      },
    });
    console.log(32, result);
    return result;
  }
}
