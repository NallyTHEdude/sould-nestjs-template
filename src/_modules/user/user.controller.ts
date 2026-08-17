import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import type { CreateUserDTO } from './dto/createUserDTO';
import type { User } from 'generated/prisma/client';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  createUser(@Body() body: CreateUserDTO): Promise<User> {
    return this.userService.createUser(body);
  }
}
