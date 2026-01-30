import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDraftListingDto } from './dto/create-draft-listing.dto';
import { DraftListing, Listing } from '@prisma/client';
import { Location } from 'src/listings/dto/listing.types';

@Injectable()
export class DraftListingsService {
  constructor(private readonly prisma: PrismaService) {}

  create(hostId: string, dto: CreateDraftListingDto): Promise<DraftListing> {
    return this.prisma.draftListing.create({
      data: {
        ...dto,
        hostId,
      },
    });
  }

  async complete(draftId: string, hostId: string): Promise<Listing> {
    const draft = await this.prisma.draftListing.findFirst({
      where: { id: draftId, hostId },
    });

    if (!draft) {
      throw new NotFoundException('Draft listing not found');
    }

    this.assertDraftIsComplete(draft);

    const [listing] = await this.prisma.$transaction([
      this.prisma.listing.create({
        data: {
          title: draft.title!,
          description: draft.description!,
          pricePerNight: draft.pricePerNight!,
          images: draft.images,
          beds: draft.beds!,
          bedrooms: draft.bedrooms!,
          bathrooms: draft.bathrooms!,
          maxGuests: draft.maxGuests!,
          maxAdults: draft.maxAdults!,
          maxChildren: draft.maxChildren!,
          maxInfants: draft.maxInfants!,
          maxPets: draft.maxPets!,
          city: draft.city!,
          country: draft.country!,
          lat: draft.lat!,
          lng: draft.lng!,
          location: draft.location!,
          checkInTime: draft.checkInTime!,
          checkOutTime: draft.checkOutTime!,
          minCancelDays: draft.minCancelDays!,
          privacyType: draft.privacyType!,
          propertyType: draft.propertyType!,
          hostId: draft.hostId,
          promotions: draft.promotions ?? [],
          score: {
            value: 0,
            reviews: [],
          },
          status: 'PENDING',
        },
      }),
      this.prisma.draftListing.delete({
        where: { id: draftId },
      }),
    ]);

    return listing;
  }

  findAll(hostId: string): Promise<DraftListing[]> {
    return this.prisma.draftListing.findMany({
      where: { hostId },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async find(hostId: string, id: string): Promise<DraftListing> {
    const draft = await this.prisma.draftListing.findFirst({
      where: { id, hostId },
    });

    if (!draft) {
      throw new NotFoundException('Draft listing not found');
    }

    return draft;
  }

  private assertDraftIsComplete(draft: DraftListing) {
    const requiredFields: (keyof DraftListing)[] = [
      'title',
      'description',
      'pricePerNight',
      'images',
      'beds',
      'bedrooms',
      'bathrooms',
      'maxGuests',
      'maxAdults',
      'maxChildren',
      'maxInfants',
      'maxPets',
      'city',
      'country',
      'lat',
      'lng',
      'location',
      'checkInTime',
      'checkOutTime',
      'minCancelDays',
      'privacyType',
      'propertyType',
    ];
    const requiredLocationFields: (keyof Location)[] = [
      'lat',
      'lng',
      'city',
      'state',
      'street',
      'country',
      'postcode',
      'timezone',
      'formatted',
      'housenumber',
    ];

    for (const field of requiredFields) {
      if (
        draft[field] === null ||
        draft[field] === undefined ||
        (Array.isArray(draft[field]) && draft[field].length === 0)
      ) {
        throw new BadRequestException(
          `Draft listing is incomplete. Missing: ${field}`,
        );
      }
    }

    for (const field of requiredLocationFields) {
      if (
        draft.location == null ||
        draft.location == undefined ||
        draft.location[field] === null ||
        draft.location[field] === undefined ||
        (Array.isArray(draft.location[field]) &&
          draft.location[field].length === 0)
      ) {
        throw new BadRequestException(
          `Draft listing location is incomplete. Missing: ${field}`,
        );
      }
    }
  }
}
