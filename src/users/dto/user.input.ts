import { Field, InputType, Int } from '@nestjs/graphql';

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
  @Field((type) => Int)
  skip: number | null;

  @Field((type) => Int)
  limit: number | null;
}
