import { BaseController } from './BaseController';
import { JsonController, Get } from 'routing-controllers';

@JsonController('/')
export class TodoController extends BaseController {
  @Get()
  public index() {
    return 'Hello! This is sample😎';
  }
}
