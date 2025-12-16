import { UserRole } from '@prisma/client';

export class UserMeResponseDto {
  id: string;
  email: string;
  role: UserRole;
  profile: {
    firstName: string;
    lastName: string;
    avatarUrl?: string | null;
    bio?: string | null;
  } | null;
}
