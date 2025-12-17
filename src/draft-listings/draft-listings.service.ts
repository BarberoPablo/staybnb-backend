import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDraftListingDto } from './dto/create-draft-listing.dto';

@Injectable()
export class DraftListingsService {
  constructor(private readonly prisma: PrismaService) {}

  create(hostId: string, dto: CreateDraftListingDto) {
    return this.prisma.draftListing.create({
      data: {
        ...dto,
        hostId,
      },
    });
  }

  async complete(draftId: string) {
    const draft = await this.prisma.draftListing.findUnique({
      where: { id: draftId },
    });

    if (!draft) {
      throw new NotFoundException('Draft listing not found');
    }

    if (!draft.title || !draft.description || !draft.pricePerNight) {
      throw new BadRequestException('Draft listing is incomplete');
    }

    const [listing] = await this.prisma.$transaction([
      this.prisma.listing.create({
        data: {
          title: draft.title,
          description: draft.description,
          pricePerNight: draft.pricePerNight,
          status: 'PENDING',
          hostId: draft.hostId,
        },
      }),
      this.prisma.draftListing.delete({
        where: { id: draftId },
      }),
    ]);

    return listing;
  }
}
