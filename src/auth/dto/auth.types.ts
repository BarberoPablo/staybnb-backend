import { UserRole } from '@prisma/client';
import { Request } from 'express';

export interface AuthContext {
  supabaseId: string;
}

export interface DomainUser {
  id: string;
  role: UserRole;
  email?: string;
}

export interface AuthRequest extends Request {
  auth?: AuthContext;
  user?: DomainUser;
}
