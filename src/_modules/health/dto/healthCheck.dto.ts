import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class HealthCheckResponseDto {
  @IsNotEmpty()
  @IsString()
  status!: 'OK';

  @IsNotEmpty()
  @IsDateString()
  timestamp!: string;

  @IsNotEmpty()
  @IsString()
  message!: string;
}
