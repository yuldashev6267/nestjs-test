import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { User } from './users.entity';
import { GetUsersInput, UpdateUserInput, UserInput } from './dto/user.input';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserInput: UserInput): Promise<User> {
    try {
      const newUser = this.usersRepository.create(createUserInput);

      return await this.usersRepository.save(newUser);
    } catch (error) {
      throw error;
    }
  }

  async update(updateUserInput: UpdateUserInput): Promise<User> {
    try {
      const user = await this.getOne(updateUserInput.id);
      user.updatedAt = new Date();
      user.username = updateUserInput.username;

      return this.usersRepository.save(user);
    } catch (error) {
      throw error;
    }
  }

  async getAll(getUsersInput: GetUsersInput): Promise<User[]> {
    try {
      const builder = this.getUserBuilder(getUsersInput);
      return await builder.getMany();
    } catch (error) {
      throw error;
    }
  }

  async getCount(getUsersInput: GetUsersInput): Promise<number> {
    try {
      const builder = this.getUserBuilder(getUsersInput);

      return await builder.getCount();
    } catch (error) {
      throw error;
    }
  }

  async getOne(id: number): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });

      // validate user exist
      if (user === null) {
        throw new NotFoundException('user not found');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  getUserBuilder(getUsersInput: GetUsersInput): SelectQueryBuilder<User> {
    try {
      const builder = this.usersRepository.createQueryBuilder();

      if (getUsersInput.skip !== null) {
        builder.skip(getUsersInput.skip);
      }

      if (getUsersInput.limit !== null) {
        builder.limit(getUsersInput.limit);
      }

      return builder;
    } catch (error) {
      throw error;
    }
  }
}
