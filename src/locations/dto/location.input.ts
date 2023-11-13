import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateLocationInput {
  @Field()
  location: string;
}

export class UpdateLocationInput {
  @Field((type) => Int)
  id: number;

  @Field()
  location: string;
}

@InputType()
export class GetLocationInput {
  @Field((type) => Int, { nullable: true })
  skip: number | null;

  @Field((type) => Int, { nullable: true })
  limit: number | null;
}
