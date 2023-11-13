import { Controller, Get } from '@nestjs/common';

@Controller('api/events')
export class EventsController {
  @Get('get')
  getOne() {
    return 'this is test';
  }
}
