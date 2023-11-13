import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UserService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersResolver, UserService],
  exports: [UserService],
  controllers: [UsersController],
})
export class UsersModule {}
