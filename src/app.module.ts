import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import * as Joi from 'joi';
import { AdminListingsModule } from './admin/listings/admin-listings.module';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { DraftListingsModule } from './host/draft-listings/draft-listings.module';
import { HostListingsModule } from './host/listings/host-listings.module';
import { PublicListingsModule } from './listings/listings.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './profiles/profiles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        SUPABASE_PROJECT_URL: Joi.string().required(),
        SUPABASE_JWKS_URL: Joi.string().required(),
        SUPABASE_SERVICE_ROLE_KEY: Joi.string().required(),
      }),
    }),
    AuthModule,
    PrismaModule,
    HealthModule,
    UsersModule,
    DraftListingsModule,
    HostListingsModule,
    AdminListingsModule,
    PublicListingsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useExisting: AuthGuard,
    },
    AuthGuard,
  ],
})
export class AppModule {}
