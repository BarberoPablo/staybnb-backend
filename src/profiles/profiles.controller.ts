import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import type { AuthUser } from '@src/auth/auth-user';
import { CurrentUser } from '@src/auth/current-user.decorator';
import { MeResponseDto } from './dto/profiles-me.dto';
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
}
