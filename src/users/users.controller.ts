import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Param,
} from '@nestjs/common';
import { UsersContract } from './users.contract';
import { UserService } from './users.service';

@Controller('api/user')
export class UsersController {
  constructor(private userService: UserService) {}

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
