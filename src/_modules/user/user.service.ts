import { DatabaseService } from '@/database/database.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/createUserDTO';
import { User } from 'generated/prisma/client';

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

  async getUserById(id: number): Promise<User | null> {
    return this.db.user.findUnique({
      where: {
        id,
      },
    });
  }
}
