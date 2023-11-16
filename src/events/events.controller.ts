import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { EventsContract } from './events.contract';
import { EventService } from './events.service';
@Controller('api/events')
export class EventsController {
  constructor(private eventService: EventService) {}

  @Get('get/:id')
  async getOne(@Param('id') id: number): Promise<EventsContract> {
    try {
      const event = await this.eventService.getOne(id);

      return EventsContract.createContractFromEntity(event);
    } catch (error) {
      console.log(typeof id);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
