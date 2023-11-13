import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @CreateDateColumn()
  @Field((type) => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field((type) => Date)
  updatedAt: Date;

  @Column({ type: 'varchar', length: 200 })
  @Field()
  username: string;
}
