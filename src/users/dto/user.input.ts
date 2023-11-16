import { Field, InputType, Int } from '@nestjs/graphql';
import { GetUsersModels } from '../models/users.models';

@InputType()
export class UserInput {
  @Field()
  username: string;
}

@InputType()
export class UpdateUserInput {
  @Field((type) => Int)
  id: number;

  @Field()
  username: string;
}

@InputType()
export class GetUsersInput {
  @Field((type) => Int, { nullable: true })
  skip: number | null;

  @Field((type) => Int, { nullable: true })
  take: number | null;

  static convertToModel(getUsersInput: GetUsersInput): GetUsersModels {
    const model = new GetUsersModels();
    model.skip = getUsersInput.skip;
    model.take = getUsersInput.take;

    return model;
  }
}
