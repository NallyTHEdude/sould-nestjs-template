import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Request, Response } from 'express';
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

  @Get('/all')
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<User | null> {
    const user: User | null = await this.userService.getUserById(id);
    if (!user)
      throw new HttpException(
        `User with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    return user;
  }
}
