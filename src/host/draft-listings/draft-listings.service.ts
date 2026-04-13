import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AmenitiesRepository } from '@src/amenities/repositories/amenities.repository';
import { completedDraftListingTemplate } from './draft-listing.utils';
import { DRAFT_LISTING_STEP_FIELDS } from './draft-listings.steps';
import { SuccessWithListingIdResponseDto } from './dto/draft-listing-response.dto';
import { PartialUpdateDraftListingDto } from './dto/draft-listing-update.dto';
import { DraftListing } from './dto/draft-listing.types';
import { mapDraftToListingUpdate } from './mappers/draft-listings.mappers';
import { DraftListingsRepository } from './repositories/draft-listings.repository';
import { validateDraftForCompletion } from './validation/validate-complete-draft';

@Injectable()
export class DraftListingsService {
  constructor(
    private readonly draftListingsRepository: DraftListingsRepository,
    private readonly amenitiesRepository: AmenitiesRepository,
  ) {}

  async create(hostId: string): Promise<SuccessWithListingIdResponseDto> {
    const { listingId } = await this.draftListingsRepository.create(hostId);
    return { listingId, success: true };
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
      const count = await this.amenitiesRepository.countByIds(draft.amenities);

      if (count !== draft.amenities.length) {
        throw new BadRequestException('Invalid amenities');
      }
    }

    return this.draftListingsRepository.publishDraft(draft);
  }

  findAll(hostId: string): Promise<DraftListing[]> {
    return this.draftListingsRepository.findAll(hostId);
  }

  async find(hostId: string, id: string): Promise<DraftListing> {
    const draft = await this.draftListingsRepository.findById(hostId, id);

    if (!draft) {
      throw new NotFoundException('Draft listing not found');
    }

    return draft;
  }

  async update(
    hostId: string,
    draftId: string,
    dto: PartialUpdateDraftListingDto,
  ): Promise<void> {
    const allowedFields = DRAFT_LISTING_STEP_FIELDS[dto.currentStep];

    if (!allowedFields) {
      throw new BadRequestException('Invalid step');
    }

    const draft = await this.draftListingsRepository.findById(hostId, draftId);

    if (!draft) {
      throw new NotFoundException('Draft listing not found');
    }

    const parsedData = mapDraftToListingUpdate(dto, draft.visitedSteps);

    await this.draftListingsRepository.update(hostId, draftId, parsedData);
  }

  async autoComplete(draftId: string, hostId: string): Promise<void> {
    const draft = await this.draftListingsRepository.findById(hostId, draftId);

    if (!draft) {
      throw new NotFoundException('Draft listing not found');
    }

    await this.draftListingsRepository.update(
      hostId,
      draftId,
      completedDraftListingTemplate,
    );
  }

  async remove(hostId: string, draftId: string): Promise<void> {
    const draft = await this.draftListingsRepository.findById(hostId, draftId);

    if (!draft) {
      throw new NotFoundException('Draft listing not found');
    }

    await this.draftListingsRepository.delete(hostId, draftId);
  }
}
