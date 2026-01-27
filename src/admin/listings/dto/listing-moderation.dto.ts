import { ListingModerationAction } from '@prisma/client';

export class ListingModerationDto {
  id: string;
  action: ListingModerationAction;
  reason?: string;
  adminId: string;
  createdAt: Date;
}
