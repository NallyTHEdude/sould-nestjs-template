import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import config from '@/config/index';
import { LoggerService } from '@/logger/logger.service';

@Injectable()
export class DatabaseService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private readonly logger: LoggerService) {
    const pool = new Pool({ connectionString: config.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    super({ adapter });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.info('Database connected successfully', DatabaseService.name);
    } catch (err) {
      this.logger.error('Database connection failed:', String(err));
      throw err;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
