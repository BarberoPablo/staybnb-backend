import { Controller, Get, NotFoundException } from '@nestjs/common';
import { UserMeResponseDto } from './dto/user-me-response.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getMe(): Promise<UserMeResponseDto> {
    const mockUserId = '0013b1f';

    const user = await this.usersService.getMe(mockUserId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const profile = user.profile
      ? {
          firstName: user.profile.firstName,
          lastName: user.profile.lastName,
          avatarUrl: user.profile.avatarUrl,
          bio: user.profile.bio,
        }
      : null;

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      profile: profile,
    };
  }
}
