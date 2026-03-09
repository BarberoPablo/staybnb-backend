import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DraftListing as PrismaDraftListing } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';
import { completedDraftListingTemplate } from './draft-listing.utils';
import { DraftListingsRepository } from './repositories/draft-listings.repository';
import { DRAFT_LISTING_STEP_FIELDS } from './draft-listings.steps';
import { UpdateDraftListingDto } from './dto/draft-listing-update.dto';
import { validateDraftForCompletion } from './validation/validate-complete-draft';

@Injectable()
export class DraftListingsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly draftListingsRepository: DraftListingsRepository,
  ) {}

  create(hostId: string): Promise<PrismaDraftListing> {
    return this.prisma.draftListing.create({
      data: { hostId },
    });
  }

  async complete(
    hostId: string,
    draftId: string,
  ): Promise<{ listingId: string }> {
    const draft = await this.draftListingsRepository.findDraftOrThrow(
      hostId,
      draftId,
    );

    validateDraftForCompletion(draft);

    if (draft.amenities?.length) {
      const count = await this.prisma.amenity.count({
        where: { id: { in: draft.amenities } },
      });

      if (count !== draft.amenities.length) {
        throw new BadRequestException('Invalid amenities');
      }
    }

    return this.draftListingsRepository.publishDraft(draft);
  }

  findAll(hostId: string): Promise<PrismaDraftListing[]> {
    return this.prisma.draftListing.findMany({
      where: { hostId },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async find(hostId: string, id: string): Promise<PrismaDraftListing> {
    const draft = await this.prisma.draftListing.findFirst({
      where: { id, hostId },
    });

    if (!draft) {
      throw new NotFoundException('Draft listing not found');
    }

    return draft;
  }

  async update(
    hostId: string,
    draftId: string,
    step: number,
    dto: UpdateDraftListingDto,
  ): Promise<void> {
    const allowedFields = DRAFT_LISTING_STEP_FIELDS[step];

    if (!allowedFields) {
      throw new BadRequestException('Invalid step');
    }

    const draft = await this.prisma.draftListing.findFirst({
      where: { id: draftId, hostId },
      select: { visitedSteps: true },
    });

    if (!draft) {
      throw new NotFoundException('Draft listing not found');
    }

    const visitedSteps = draft.visitedSteps.includes(step)
      ? draft.visitedSteps
      : [...draft.visitedSteps, step];

    await this.prisma.draftListing.update({
      where: { id: draftId, hostId },
      data: {
        ...dto,
        currentStep: step,
        visitedSteps: {
          set: visitedSteps,
        },
      },
    });
  }

  async autoComplete(draftId: string, hostId: string) {
    const draft = await this.prisma.draftListing.findFirst({
      where: { id: draftId, hostId },
    });

    if (!draft) {
      throw new NotFoundException('Draft listing not found');
    }

    await this.prisma.draftListing.update({
      where: { id: draftId, hostId },
      data: {
        ...completedDraftListingTemplate,
      },
    });

    return { success: true };
  }

  async remove(hostId: string, draftId: string): Promise<void> {
    const draft = await this.prisma.draftListing.findFirst({
      where: { id: draftId, hostId },
    });

    if (!draft) {
      throw new NotFoundException('Draft listing not found');
    }

    await this.prisma.draftListing.delete({
      where: { id: draftId },
    });
  }
}
