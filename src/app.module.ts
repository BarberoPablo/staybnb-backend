import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AdminListingsModule } from './admin/listings/admin-listings.module';
import { AuthGuard } from './auth/auth.guard';
import { DraftListingsModule } from './draft-listings/draft-listings.module';
import { HealthModule } from './health/health.module';
import { ListingsModule } from './listings/listings.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    PrismaModule,
    HealthModule,
    UsersModule,
    DraftListingsModule,
    ListingsModule,
    AdminListingsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
