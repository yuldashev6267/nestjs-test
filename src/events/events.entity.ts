import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Location } from '../locations/location.entity';
import { type } from 'os';
import { User } from '../users/users.entity';

@Entity()
@ObjectType()
export class Event {
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
  @Field((type) => Date, { nullable: true })
  deletedAt: Date;

  @Column({ type: 'bool', default: false })
  @Field((type) => Boolean)
  isDeleted: boolean;

  @Column({ type: 'timestamptz', nullable: false })
  @Field((type) => Date)
  @Field({ nullable: false })
  startDate: Date;

  @Column({ type: 'timestamptz', nullable: false })
  @Field((type) => Date)
  @Field({ nullable: false })
  expireDate: Date;

  @Column({ type: 'varchar', length: 100 })
  @Field()
  name: string;

  @Column({ type: 'varchar', length: 1000 })
  @Field()
  description: string;

  @OneToOne(() => Location)
  @JoinColumn()
  @Field((type) => Location)
  location: Location;

  @OneToOne(() => User)
  @JoinColumn()
  @Field((type) => User)
  user: User;
}
