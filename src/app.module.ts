import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import * as Joi from 'joi';
import { AdminListingsModule } from './admin/listings/admin-listings.module';
import { AmenitiesModule } from './amenities/amenities.module';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { CitiesModule } from './cities/cities.module';
import { EmailModule } from './email/email.module';
import { HealthModule } from './health/health.module';
import { DraftListingsModule } from './host/draft-listings/draft-listings.module';
import { HostListingsModule } from './host/listings/host-listings.module';
import { ListingsModule } from './listings/listings.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './profiles/profiles.module';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        SUPABASE_PROJECT_URL: Joi.string().required(),
        SUPABASE_JWKS_URL: Joi.string().required(),
        SUPABASE_SERVICE_ROLE_KEY: Joi.string().required(),
        RESEND_API_KEY: Joi.string().required(),
        FRONTEND_URL: Joi.string().required(),
      }),
    }),
    AuthModule,
    PrismaModule,
    HealthModule,
    UsersModule,
    DraftListingsModule,
    HostListingsModule,
    AdminListingsModule,
    ListingsModule,
    ReservationsModule,
    EmailModule,
    CitiesModule,
    AmenitiesModule,
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
