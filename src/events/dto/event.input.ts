import { Field, InputType, Int } from '@nestjs/graphql';
@InputType()
export class CreateEventInput {
  @Field((type) => Int)
  locationId: number;

  @Field((type) => Int)
  userId: number;

  @Field((type) => Date)
  createDate: Date;

  @Field((type) => Date)
  expireDate: Date;

  @Field()
  name: string;

  @Field()
  description: string;
}

@InputType()
export class UpdateEventInput {
  @Field((type) => Int)
  id: number;

  @Field((type) => Date)
  createDate: Date;

  @Field((type) => Date)
  expireDate: Date;

  @Field()
  name: string;

  @Field()
  description: string;
}

@InputType()
export class FilterEventsInput {
  @Field((type) => Date)
  @Field({ nullable: true })
  createDate: Date | null;

  @Field(() => Date)
  @Field({ nullable: true })
  expireDate: Date | null;

  @Field((type) => Int, { nullable: true })
  skip: number | null;

  @Field((type) => Int, { nullable: true })
  take: number | null;
}
