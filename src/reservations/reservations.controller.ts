import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import type { AuthUser } from '@src/auth/auth-user';
import { CurrentUser } from '@src/auth/current-user.decorator';
import { Public } from '@src/auth/public.decorator';
import { ErrorResponseDto } from '@src/errors/dto/error-response.dto';
import { SuccessReservationResponseDto } from './dto/reservation-response.dto';
import { CreateReservationDto } from './dto/reservations-create.dto';
import { ListingUnavailableDatesDto } from './dto/reservations-unavailable-dates.dto';
import { UserReservationResponseDto } from './dto/user-reservation-response.dto';
import { ReservationsService } from './reservations.service';

@ApiTags('Reservations')
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly service: ReservationsService) {}

  @Public()
  @ApiOkResponse({ type: ListingUnavailableDatesDto })
  @Get(':id/unavailable-dates')
  async getUnavailableDates(
    @Param('id') id: string,
  ): Promise<ListingUnavailableDatesDto> {
    return this.service.getUnavailableDates(id);
  }

  // Private
  @ApiOkResponse({ type: SuccessReservationResponseDto })
  @ApiBadRequestResponse({
    type: ErrorResponseDto,
  })
  @Post(':id')
  async create(
    @Param('id') id: string,
    @Body() data: CreateReservationDto,
    @CurrentUser() user: AuthUser,
  ): Promise<SuccessReservationResponseDto> {
    return this.service.create(id, data, user);
  }

  @ApiOkResponse({ type: [UserReservationResponseDto] })
  @Get('me')
  async findMy(
    @CurrentUser() user: AuthUser,
  ): Promise<UserReservationResponseDto[]> {
    return this.service.findMy(user);
  }
}
