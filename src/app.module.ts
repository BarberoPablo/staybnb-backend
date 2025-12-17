import { Module } from '@nestjs/common';
import { DraftListingsModule } from './draft-listings/draft-listings.module';
import { HealthModule } from './health/health.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PrismaModule, HealthModule, UsersModule, DraftListingsModule],
})
export class AppModule {}
