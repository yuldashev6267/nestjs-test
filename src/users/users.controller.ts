import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Query,
} from '@nestjs/common';
import { UsersContract } from './users.contract';
import { UserService } from './users.service';
import { GetUsersModels } from './models/users.models';
import { pipe, map } from 'rxjs';
@Controller('api/user')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get('get')
  async getAll(
    @Query('skip') skip: number | null,
    @Query('take') take: number | null,
  ): Promise<UsersContract[]> {
    try {
      const model = new GetUsersModels();
      model.take = take;
      model.skip = skip;

      const users = await this.userService.getAll(model);
      return users.map((el) => UsersContract.createContractFromEntity(el));
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Get('get/:id')
  async getOne(@Param('id') id: number): Promise<UsersContract> {
    try {
      const user = await this.userService.getOne(id);
      return UsersContract.createContractFromEntity(user);
    } catch (error) {
      if (error.message === 'user not found') {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      }

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
