import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EventService } from './events.service';
import { Event } from './events.entity';
import { CreateEventInput, FilterEventsInput } from './dto/event.input';
@Resolver((of) => Event)
export class EventsResolver {
  constructor(private eventService: EventService) {}

  @Mutation((returns) => Event)
  async createEvent(
    @Args('createEventInput') createEventInput: CreateEventInput,
  ): Promise<Event> {
    return this.eventService.create(createEventInput);
  }

  @Query((returns) => [Event])
  async getEvents(
    @Args('filterEventInput') filterEventsInput: FilterEventsInput,
  ): Promise<Event[]> {
    try {
      return await this.eventService.getAll(filterEventsInput);
    } catch (error) {
      throw Error(error.message);
    }
  }
}
