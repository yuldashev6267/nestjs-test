import { User } from './users.entity';

export class UsersContract {
  id: number;

  createdAt: string;

  updatedAt: string;

  username: string;

  static createContractFromEntity(userEntity: User): UsersContract {
    const contract = new UsersContract();
    contract.id = userEntity.id;
    contract.createdAt = userEntity.createdAt.toString();
    contract.updatedAt = userEntity.updatedAt.toString();
    contract.username = userEntity.username;
    return contract;
  }
}
