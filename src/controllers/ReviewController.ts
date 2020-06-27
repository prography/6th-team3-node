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
import { ReviewService } from '../services/ReviewService';

export interface SignUpReviewRequest {
  userId: number;
  data: ReviewData;
}

export interface ReviewData {
  rating: number;
  content: string;
}

export interface SignUpReviewResponse {
  status: number;
  message: string;
  data: any[];
}

export interface SignUpReviewPostResponse {
  status: number;
  message: string;
  data: any;
}

export interface DeleteReviewRequest {
  userId: number;
}

export interface DeleteReviewResponse {
  status: number;
  message: string;
}

@JsonController('/reviews/:hotelId')
export class ReviewController extends BaseController {
  private databaseClient: PrismaClient;
  private reviewService: ReviewService;

  constructor() {
    super();
    this.databaseClient = new PrismaClient();
    this.reviewService = new ReviewService();
  }

  @Get()
  public async allReviews(@Param('hotelId') hotelId: number) {
    const getReviews: any = await this.reviewService.getReviews(hotelId);

    const response: SignUpReviewResponse = {
      status: 201,
      message: 'Success reviews get',
      data: getReviews,
    };

    return response;
  }

  @Get('/:reviewId')
  public async oneReview(
    @Param('hotelId') hotelId: number,
    @Param('reviewId') reviewId: number
  ) {
    const getReview: any = await this.reviewService.getReview(
      hotelId,
      reviewId
    );

    const response: SignUpReviewResponse = {
      status: 201,
      message: 'Success review get',
      data: getReview,
    };

    return response;
  }

  @Post()
  public async createReview(
    @Param('hotelId') hotelId: number,
    @Body() reviewData: string
  ) {
    const bodyData: SignUpReviewRequest = JSON.parse(
      JSON.stringify(reviewData)
    );

    const { userId, data } = bodyData;

    const newReview = await this.reviewService.createreview(
      userId,
      hotelId,
      data
    );

    const response: SignUpReviewPostResponse = {
      status: 201,
      message: 'Success Hotel Review Creation',
      data: newReview,
    };

    return response;
  }

  @Put('/:reviewId')
  public async updateReview(
    @Param('hotelId') hotelId: number,
    @Param('reviewId') reviewId: number,
    @Body() reviewData: string
  ) {
    const bodyData: SignUpReviewRequest = JSON.parse(
      JSON.stringify(reviewData)
    );
    const { userId, data } = bodyData;

    const newReview: any = await this.reviewService.editReview(
      userId,
      hotelId,
      reviewId,
      data
    );
    //console.log(newHotel);

    const response: SignUpReviewPostResponse = {
      status: 201,
      message: 'Success Hotel edit',
      data: newReview,
    };

    return response;
  }

  @Delete('/:reviewId')
  public async deleteReview(
    @Param('hotelId') hotelId: number,
    @Param('reviewId') reviewId: number,
    @Body() reviewData: string
  ) {
    const bodyData: DeleteReviewRequest = JSON.parse(
      JSON.stringify(reviewData)
    );
    const { userId } = bodyData;
    const deleteReview = await this.reviewService.deleteReview(reviewId);

    const response: DeleteReviewResponse = {
      status: 201,
      message: 'Success Review delete',
    };

    return response;
  }
}
