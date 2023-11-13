import { Module } from '@nestjs/common';
import { EventService } from './events.service';
import { EventsResolver } from './events.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './events.entity';
import { UsersModule } from '../users/users.module';
import { LocationsModule } from '../locations/locations.module';
import { EventsController } from './events.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), UsersModule, LocationsModule],
  providers: [EventsResolver, EventService],
  controllers: [EventsController],
})
export class EventsModule {}
