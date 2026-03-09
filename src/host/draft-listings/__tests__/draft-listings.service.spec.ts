import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@src/prisma/prisma.service';
import { DraftListingsRepository } from '../repositories/draft-listings.repository';
import { DraftListingsService } from '../draft-listings.service';
import { DraftListing } from '../dto/draft-listing.types';
import * as mappers from '../mappers/draft-listings.mappers';
import * as validation from '../validation/validate-complete-draft';

describe('DraftListingsService', () => {
  let service: DraftListingsService;
  let prisma: PrismaService;
  let repository: DraftListingsRepository;

  const mockDraftListing: DraftListing = {
    id: 'draft123',
    hostId: 'host123',
    amenities: ['amenity1'],
    title: 'Title',
    description: 'Description',
    nightPrice: 40,
    images: ['img1', 'img2', 'img3'],
    beds: 1,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    maxAdults: 2,
    maxChildren: 0,
    maxInfants: 0,
    maxPets: 0,
    location: {
      country: 'Country',
      city: 'City',
      lat: 0,
      lng: 0,
      formatted: 'Formatted',
      housenumber: '1',
      street: 'Street',
      state: 'State',
      postcode: '12345',
      timezone: 'UTC',
    },
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
              create: jest.fn(),
              update: jest.fn(),
            },
            amenity: {
              count: jest.fn(),
            },
          },
        },
        {
          provide: DraftListingsRepository,
          useValue: {
            findDraftOrThrow: jest.fn(),
            publishDraft: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DraftListingsService>(DraftListingsService);
    prisma = module.get<PrismaService>(PrismaService);
    repository = module.get<DraftListingsRepository>(DraftListingsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('complete', () => {
    const hostId = 'host123';
    const draftId = 'draft123';

    it('should complete the draft if valid', async () => {
      jest
        .spyOn(repository, 'findDraftOrThrow')
        .mockResolvedValue(mockDraftListing);
      jest
        .spyOn(validation, 'validateDraftForCompletion')
        .mockReturnValue({} as any);
      jest
        .spyOn(mappers, 'sanitizeDraftListing')
        .mockReturnValue(mockDraftListing as any);
      jest.spyOn(prisma.amenity, 'count').mockResolvedValue(1);
      jest
        .spyOn(repository, 'publishDraft')
        .mockResolvedValue({ listingId: 'listing123' });

      const result = await service.complete(hostId, draftId);

      expect(repository.findDraftOrThrow).toHaveBeenCalledWith(hostId, draftId);
      expect(prisma.amenity.count).toHaveBeenCalledWith({
        where: { id: { in: ['amenity1'] } },
      });
      expect(repository.publishDraft).toHaveBeenCalled();
      expect(result).toEqual({ listingId: 'listing123' });
    });

    it('should throw BadRequestException if amenities are invalid', async () => {
      jest
        .spyOn(repository, 'findDraftOrThrow')
        .mockResolvedValue(mockDraftListing);
      jest
        .spyOn(validation, 'validateDraftForCompletion')
        .mockReturnValue({} as any);
      jest
        .spyOn(mappers, 'sanitizeDraftListing')
        .mockReturnValue(mockDraftListing as any);
      jest.spyOn(prisma.amenity, 'count').mockResolvedValue(0);

      await expect(service.complete(hostId, draftId)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('remove', () => {
    const hostId = 'host123';
    const draftId = 'draft123';

    it('should delete the record if it exists and the userId matches the owner', async () => {
      const findFirstSpy = jest
        .spyOn(prisma.draftListing, 'findFirst')
        .mockResolvedValue(mockDraftListing);

      const deleteSpy = jest
        .spyOn(prisma.draftListing, 'delete')
        .mockResolvedValue(mockDraftListing);

      await service.remove(hostId, draftId);

      expect(findFirstSpy).toHaveBeenCalledWith({
        where: { id: draftId, hostId },
      });
      expect(deleteSpy).toHaveBeenCalledWith({
        where: { id: draftId },
      });
    });

    it('should throw NotFoundException if the DraftListing ID does not exist', async () => {
      const findFirstSpy = jest
        .spyOn(prisma.draftListing, 'findFirst')
        .mockResolvedValue(null);

      const deleteSpy = jest.spyOn(prisma.draftListing, 'delete');

      await expect(service.remove(hostId, draftId)).rejects.toThrow(
        NotFoundException,
      );

      expect(findFirstSpy).toHaveBeenCalledWith({
        where: { id: draftId, hostId },
      });
      expect(deleteSpy).not.toHaveBeenCalled();
    });

    it('should throw NotFoundException if a different user tries to delete it', async () => {
      const findFirstSpy = jest
        .spyOn(prisma.draftListing, 'findFirst')
        .mockResolvedValue(null);

      const deleteSpy = jest.spyOn(prisma.draftListing, 'delete');

      const differentHostId = 'host456';

      await expect(service.remove(differentHostId, draftId)).rejects.toThrow(
        NotFoundException,
      );

      expect(findFirstSpy).toHaveBeenCalledWith({
        where: { id: draftId, hostId: differentHostId },
      });
      expect(deleteSpy).not.toHaveBeenCalled();
    });
  });
});
