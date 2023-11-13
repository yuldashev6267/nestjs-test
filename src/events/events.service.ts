import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './events.entity';

import { Repository } from 'typeorm';
import { CreateEventInput, FilterEventsInput } from './dto/event.input';
import { UserService } from '../users/users.service';
import { LocationsService } from '../locations/locations.service';
import { filter } from 'rxjs';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event) private eventRepository: Repository<Event>,
    private userService: UserService,
    private locationsService: LocationsService,
  ) {}

  async create(createEventInput: CreateEventInput): Promise<Event> {
    try {
      // try to load user
      const user = await this.userService.getOne(createEventInput.userId);
      // try to load location
      const location = await this.locationsService.getOne(
        createEventInput.locationId,
      );

      // validate there was any event between start and end date
      const events = await this.eventRepository.find({
        relations: ['location'],
        where: {
          startDate: createEventInput.createDate,
          expireDate: createEventInput.expireDate,
        },
      });

      if (events.length > 0) {
        throw new BadRequestException('this date already taken');
      }

      // create new event
      const params = {
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        isDeleted: false,
        startDate: createEventInput.createDate,
        expireDate: createEventInput.expireDate,
        name: createEventInput.name,
        description: createEventInput.description,
        user: user,
        location: location,
      };

      const newEvent = this.eventRepository.create(params);
      return await this.eventRepository.save(newEvent);
    } catch (error) {
      throw error;
    }
  }

  async getAll(filterEventInput: FilterEventsInput): Promise<Event[]> {
    try {
      const builder = this.eventRepository.createQueryBuilder();

      if (filterEventInput.skip !== null) {
        builder.skip(filterEventInput.skip);
      }

      if (filterEventInput.take !== null) {
        builder.take(filterEventInput.take);
      }

      return await builder.getMany();
    } catch (error) {
      throw error;
    }
  }

  getOne(id: number) {
    return this.eventRepository.findOneByOrFail({ id: id });
  }
}
