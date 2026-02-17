import { Body, Controller, Param, Post } from '@nestjs/common';
import type { AuthUser } from '@src/auth/auth-user';
import { CurrentUser } from '@src/auth/current-user.decorator';
import { CreateReservationDto } from './dto/reservations-create.dto';
import { ReservationsService } from './reservations.service';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly service: ReservationsService) {}

  @Post(':listingId')
  create(
    @Param('listingId') listingId: string,
    @Body() data: CreateReservationDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.service.create(listingId, data, user);
  }
}
