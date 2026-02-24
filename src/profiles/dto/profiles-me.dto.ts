import { UserRole } from '@prisma/client';

export class MeResponseDto {
  id: string;
  role: UserRole;
  email: string;

  firstName: string;
  lastName: string;
  avatarUrl?: string | null;
  bio?: string | null;

  createdAt: Date;
  updatedAt: Date;
}
