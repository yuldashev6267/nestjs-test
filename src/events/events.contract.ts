import { from } from 'rxjs';

import { Event } from './events.entity';
import { LocationsContract } from '../locations/locations.contract';
import { UsersContract } from '../users/users.contract';

export class EventsContract {
  id: number;

  createdAt: string;

  updatedAt: string;

  deletedAt: string | null;

  isDeleted: boolean | null;

  startDate: string;

  expireDate: string;

  name: string;

  description: string;

  location: LocationsContract;

  user: UsersContract;

  static createContractFromEntity(eventEntity: Event): EventsContract {
    const contract = new EventsContract();
    contract.id = eventEntity.id;
    contract.createdAt = eventEntity.createdAt.toString();
    contract.updatedAt = eventEntity.updatedAt.toString();
    contract.deletedAt = eventEntity.deletedAt
      ? eventEntity.deletedAt.toString()
      : null;
    contract.isDeleted = eventEntity.isDeleted;
    contract.startDate = eventEntity.startDate.toString();
    contract.expireDate = eventEntity.expireDate.toString();
    contract.name = eventEntity.name;
    contract.description = eventEntity.description;
    contract.location = LocationsContract.createContractFromEntity(
      eventEntity.location,
    );
    contract.user = UsersContract.createContractFromEntity(eventEntity.user);

    return contract;
  }
}
