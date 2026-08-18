import { Module } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { UserModule } from './_modules/user/user.module';
import { HealthModule } from './_modules/health/health.module';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import { APP_GUARD } from '@nestjs/core';

// rate limiting configuration
const rateLimitConfig = {
  throttlers: [
    {
      ttl: 60000, // 1 minute
      limit: 30, // 30 requests per minute
    },
  ],
};

// app module that imports all other modules and sets up rate limiting
@Module({
  imports: [
    LoggerModule,
    DatabaseModule,
    ThrottlerModule.forRoot(rateLimitConfig),
    UserModule,
    HealthModule,
  ],

  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
