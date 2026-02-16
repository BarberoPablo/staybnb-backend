import { UserRole } from '@prisma/client';

export interface AuthUser {
  id: string;
  supabaseId: string;
  role: UserRole;
}
