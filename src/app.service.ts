import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  greet(): string {
    return 'Welcome to SoulD backend service';
  }
}
