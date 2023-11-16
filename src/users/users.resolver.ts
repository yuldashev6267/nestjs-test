import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './users.service';
import { User } from './users.entity';
import { GetUsersInput, UserInput } from './dto/user.input';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private userService: UserService) {}

  @Mutation((returns) => User)
  async createUser(
    @Args('createUserInput') createUserInput: UserInput,
  ): Promise<User> {
    try {
      return await this.userService.create(createUserInput);
    } catch (error) {
      throw Error(error.message);
    }
  }

  @Query((returns) => User)
  async getUser(@Args('id', { type: () => Int }) id: number): Promise<User> {
    try {
      return await this.userService.getOne(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // this is not good practise
  // if requester is not admin
  @Query((returns) => [User])
  async getUsers(
    @Args('getUsersInput') getUsersInput: GetUsersInput,
  ): Promise<User[]> {
    try {
      const model = GetUsersInput.convertToModel(getUsersInput);
      return await this.userService.getAll(model);
    } catch (error) {
      throw Error(error.message);
    }
  }

  @Query((returns) => Int)
  async getUsersCount(
    @Args('getUsersInput') getUsersInput: GetUsersInput,
  ): Promise<number> {
    try {
      return await this.userService.getCount(getUsersInput);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
