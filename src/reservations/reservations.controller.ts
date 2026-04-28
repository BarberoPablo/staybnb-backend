import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import type { AuthUser } from '@src/auth/auth-user';
import { CurrentUser } from '@src/auth/current-user.decorator';
import { ReservationResponseDto } from './dto/reservation-response.dto';
import { CreateReservationDto } from './dto/reservations-create.dto';
import { ReservationsService } from './reservations.service';

@ApiTags('Reservations')
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly service: ReservationsService) {}

  @Post(':listingId')
  @ApiOkResponse({ type: ReservationResponseDto })
  async create(
    @Param('listingId') listingId: string,
    @Body() data: CreateReservationDto,
    @CurrentUser() user: AuthUser,
  ): Promise<ReservationResponseDto> {
    return this.service.create(listingId, data, user);
  }
}
