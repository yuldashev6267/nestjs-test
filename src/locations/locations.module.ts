import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsResolver } from './locations.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './location.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Location]), UsersModule],
  providers: [LocationsService, LocationsResolver],
  exports: [LocationsService],
})
export class LocationsModule {}
