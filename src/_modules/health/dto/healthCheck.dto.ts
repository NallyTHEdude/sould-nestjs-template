import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { HealthCheckResponse } from '@/types/Health';
export class HealthCheckResponseDto implements Partial<HealthCheckResponse> {
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
