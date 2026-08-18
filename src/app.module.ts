import { Module } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { UserModule } from './_modules/user/user.module';
import { HealthModule } from './_modules/health/health.module';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
@Module({
  imports: [
    LoggerModule,
    DatabaseModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000, // 1 minute
          limit: 30, // 30 requests per minute
        },
      ],
    }),
    UserModule,
    HealthModule,
  ],

  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
