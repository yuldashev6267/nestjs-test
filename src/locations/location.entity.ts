import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Location {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @CreateDateColumn()
  @Field((type) => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field((type) => Date)
  updatedAt: Date;

  @DeleteDateColumn()
  @Field((type) => Date)
  deletedAt: Date;

  @Column({ type: 'bool', default: false })
  @Field((type) => Boolean)
  isDeleted: boolean;

  @Column({ type: 'varchar', length: 200 })
  @Field()
  location: string;
}
