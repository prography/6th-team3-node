import { BaseController } from './BaseController';
import { PrismaClient } from '@prisma/client';
import { JsonController, Get } from 'routing-controllers';
//import Logger from '../loaders/logger';

@JsonController('/')
export class TodoController extends BaseController {
  private databaseClient: PrismaClient;
  constructor() {
    super();
    this.databaseClient = new PrismaClient();
  }
  @Get()
  public index() {
    return 'Hello! This is sample😎';
  }
}
