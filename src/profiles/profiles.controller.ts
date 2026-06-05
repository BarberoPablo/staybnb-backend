import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import type { AuthUser } from '@src/auth/auth-user';
import { CurrentUser } from '@src/auth/current-user.decorator';
import { SuccessResponseDto } from '@src/shared/dto/success-response.dto';
import { MeResponseDto } from './dto/profiles-me.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfilesService } from './profiles.service';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly service: ProfilesService) {}

  @Get('me')
  @ApiOkResponse({ type: MeResponseDto })
  async findMe(@CurrentUser() user: AuthUser): Promise<MeResponseDto> {
    return this.service.findMe(user);
  }

  @Patch('me')
  @ApiOkResponse({ type: SuccessResponseDto })
  @ApiNotFoundResponse({ description: 'Profile not found' })
  async updateMe(
    @CurrentUser() user: AuthUser,
    @Body() dto: UpdateProfileDto,
  ): Promise<SuccessResponseDto> {
    return this.service.updateMe(user, dto);
  }
}
