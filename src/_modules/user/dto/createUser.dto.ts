import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from '@/types/User';
export class CreateUserDto implements Pick<User, 'email' & 'name'> {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;
}
