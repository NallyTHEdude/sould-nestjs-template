import { DatabaseService } from '@/database/database.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'generated/prisma/client';
import { CreateUserDTO } from './dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(private readonly db: DatabaseService) {}

  async createUser(dto: CreateUserDTO): Promise<User> {
    return this.db.user.create({
      data: {
        email: dto.email,
        name: dto.name,
      },
    });
  }

  async getAllUsers(): Promise<User[]> {
    return this.db.user.findMany();
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.db.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new HttpException(
        `User with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }
}
