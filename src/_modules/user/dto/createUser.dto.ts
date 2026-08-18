import { IsEmail, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNumberString()
  @IsNotEmpty()
  id!: number;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;
}
