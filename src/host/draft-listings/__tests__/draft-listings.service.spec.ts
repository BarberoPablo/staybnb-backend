import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DraftListing } from '@prisma/client';
import { DraftListingsService } from '../draft-listings.service';
import { PrismaService } from '@src/prisma/prisma.service';

describe('DraftListingsService', () => {
  let service: DraftListingsService;
  let prisma: PrismaService;

  const mockDraftListing: DraftListing = {
    id: 'draft123',
    hostId: 'host123',
    amenities: [],
    title: '',
    description: '',
    nightPrice: 40,
    images: [],
    beds: 0,
    bedrooms: 0,
    bathrooms: 0,
    maxGuests: 2,
    maxAdults: 2,
    maxChildren: 0,
    maxInfants: 0,
    maxPets: 0,
    location: {},
    promotions: [],
    checkInTime: '15:00',
    checkOutTime: '11:00',
    minCancelDays: 3,
    propertyType: 'HOUSE',
    privacyType: 'ENTIRE',
    createdAt: new Date(),
    updatedAt: new Date(),
    currentStep: 0,
    visitedSteps: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DraftListingsService,
        {
          provide: PrismaService,
          useValue: {
            draftListing: {
              findFirst: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<DraftListingsService>(DraftListingsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('remove', () => {
    const hostId = 'host123';
    const draftId = 'draft123';

    it('should delete the record if it exists and the userId matches the owner', async () => {
      jest
        .spyOn(prisma.draftListing, 'findFirst')
        .mockResolvedValue(mockDraftListing);
      jest
        .spyOn(prisma.draftListing, 'delete')
        .mockResolvedValue(mockDraftListing);

      await service.remove(hostId, draftId);

      expect(prisma.draftListing.findFirst).toHaveBeenCalledWith({
        where: { id: draftId, hostId },
      });
      expect(prisma.draftListing.delete).toHaveBeenCalledWith({
        where: { id: draftId },
      });
    });

    it('should throw NotFoundException if the DraftListing ID does not exist', async () => {
      jest.spyOn(prisma.draftListing, 'findFirst').mockResolvedValue(null);

      await expect(service.remove(hostId, draftId)).rejects.toThrow(
        NotFoundException,
      );
      expect(prisma.draftListing.findFirst).toHaveBeenCalledWith({
        where: { id: draftId, hostId },
      });
      expect(prisma.draftListing.delete).not.toHaveBeenCalled();
    });

    it('should throw NotFoundException if a different user tries to delete it', async () => {
      jest.spyOn(prisma.draftListing, 'findFirst').mockResolvedValue(null); // findFirst with different hostId will return null

      const differentHostId = 'host456';
      await expect(service.remove(differentHostId, draftId)).rejects.toThrow(
        NotFoundException,
      );
      expect(prisma.draftListing.findFirst).toHaveBeenCalledWith({
        where: { id: draftId, hostId: differentHostId },
      });
      expect(prisma.draftListing.delete).not.toHaveBeenCalled();
    });
  });
});
