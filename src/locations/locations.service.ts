import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './location.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import {
  CreateLocationInput,
  GetLocationInput,
  UpdateLocationInput,
} from './dto/location.input';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  create(createInputRepository: CreateLocationInput) {
    try {
      const newLocation = this.locationRepository.create(createInputRepository);
      return this.locationRepository.save(newLocation);
    } catch (error) {
      throw error;
    }
  }

  async update(updateLocationInput: UpdateLocationInput): Promise<Location> {
    try {
      const location = await this.getOne(updateLocationInput.id);

      location.location = updateLocationInput.location;
      location.updatedAt = new Date();

      return await this.locationRepository.save(location);
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number): Promise<Location> {
    try {
      const location = await this.getOne(id);

      location.isDeleted = true;
      location.deletedAt = new Date();

      return await this.locationRepository.save(location);
    } catch (error) {
      throw error;
    }
  }

  async getAll(getLocationInput: GetLocationInput): Promise<Location[]> {
    try {
      const builder = this.getBuilder(getLocationInput);
      return await builder.getMany();
    } catch (error) {
      throw error;
    }
  }

  async getCount(getLocationInput: GetLocationInput): Promise<number> {
    try {
      const builder = this.getBuilder(getLocationInput);

      return await builder.getCount();
    } catch (error) {
      throw error;
    }
  }

  getOne(id: number) {
    try {
      const location = this.locationRepository.findOneBy({
        id: id,
        isDeleted: false,
      });

      if (location === null) {
        throw new NotFoundException('location not found');
      }

      return location;
    } catch (error) {
      throw error;
    }
  }

  getBuilder(getLocationInput): SelectQueryBuilder<Location> {
    const builder = this.locationRepository
      .createQueryBuilder('location')
      .where('location.isDeleted = :', { isDeleted: false });

    if (getLocationInput.skip !== null) {
      builder.skip(getLocationInput.skip);
    }

    if (getLocationInput.limit !== null) {
      builder.limit(getLocationInput.limit);
    }

    return builder;
  }
}
