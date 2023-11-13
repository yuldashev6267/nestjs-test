import { Location } from './location.entity';

export class LocationsContract {
  id: number;

  createdAt: string;

  updatedAt: string;

  deletedAt: string | null;

  isDeleted: boolean | null;

  location: string;

  static createContractFromEntity(
    locationsEntity: Location,
  ): LocationsContract {
    const contract = new LocationsContract();
    contract.id = locationsEntity.id;
    contract.createdAt = locationsEntity.createdAt.toString();
    contract.updatedAt = locationsEntity.updatedAt.toString();
    contract.deletedAt = locationsEntity.deletedAt.toString();
    contract.isDeleted = locationsEntity.isDeleted;
    contract.location = locationsEntity.location;
    return contract;
  }
}
