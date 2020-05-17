import { BaseController } from './BaseController';
import { PrismaClient } from '@prisma/client';
import { JsonController, Get } from 'routing-controllers';

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
