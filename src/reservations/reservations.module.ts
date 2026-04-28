import { Module } from '@nestjs/common';
import { EmailModule } from '@src/email/email.module';
import { ListingsModule } from '@src/listings/listings.module';
import { ProfilesModule } from '@src/profiles/profiles.module';
import { ReservationRepository } from './repositories/reservation.repository';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';

@Module({
  imports: [EmailModule, ListingsModule, ProfilesModule],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationRepository],
})
export class ReservationsModule {}
