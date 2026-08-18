import { Module } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { UserModule } from './_modules/user/user.module';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
@Module({
  imports: [
    LoggerModule,
    DatabaseModule,
    UserModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000, // 1 minute
          limit: 30, // 30 requests per minute
        },
      ],
    }),
    LoggerModule,
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
