import { ListingModeration } from '@prisma/client';
import { ListingModerationDto } from './listing-moderation.dto';

export function mapModerationToDto(
  moderation: ListingModeration,
): ListingModerationDto {
  return {
    id: moderation.id,
    action: moderation.action,
    reason: moderation.reason ?? undefined,
    adminId: moderation.adminId,
    createdAt: moderation.createdAt,
  };
}
