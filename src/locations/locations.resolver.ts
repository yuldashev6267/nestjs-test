import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Location } from './location.entity';
import { LocationsService } from './locations.service';
import { CreateLocationInput, GetLocationInput } from './dto/location.input';

@Resolver((of) => Location)
export class LocationsResolver {
  constructor(private locationService: LocationsService) {}

  @Mutation((returns) => Location)
  createLocation(
    @Args('createLocationInput') createLocationInput: CreateLocationInput,
  ): Promise<Location> {
    return this.locationService.create(createLocationInput);
  }

  @Query((returns) => [Location])
  getLocations(
    @Args('getLocationInput') getLocationInput: GetLocationInput,
  ): Promise<Location[]> {
    return this.locationService.getAll(getLocationInput);
  }

  @Query((returns) => Location)
  getLocation(@Args('id', { type: () => Int }) id: number) {
    return this.locationService.getOne(id);
  }
}
