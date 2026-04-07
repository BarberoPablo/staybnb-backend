/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/unbound-method */
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DraftListing as PrismaDraftListing } from '@prisma/client';
import { DraftListingsRepository } from '@src/host/draft-listings/repositories/draft-listings.repository';
import { PrismaService } from '@src/prisma/prisma.service';

describe('DraftListingsRepository', () => {
  let repository: DraftListingsRepository;
  let prisma: PrismaService;

  const mockPrismaDraft: PrismaDraftListing = {
    id: 'draft123',
    hostId: 'host123',
    title: 'Title',
    description: 'Description',
    nightPrice: 40,
    images: [],
    amenities: [],
    currentStep: 0,
    visitedSteps: [],
    promotions: [],
    beds: 1,
    bedrooms: 1,
    bathrooms: 1,
    maxAdults: 2,
    maxChildren: 0,
    maxInfants: 0,
    maxPets: 0,
    maxGuests: 2,
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
    checkInTime: '15:00',
    checkOutTime: '11:00',
    minCancelDays: 3,
    privacyType: 'ENTIRE',
    propertyType: 'HOUSE',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DraftListingsRepository,
        {
          provide: PrismaService,
          useValue: {
            draftListing: {
              create: jest.fn(),
              findMany: jest.fn(),
              findFirst: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
            listing: {
              create: jest.fn(),
            },
            listingAmenity: {
              createMany: jest.fn(),
            },
            $transaction: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<DraftListingsRepository>(DraftListingsRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('should call prisma.create with hostId', async () => {
      jest.spyOn(prisma.draftListing, 'create').mockResolvedValue({ id: 'new-id' } as any);

      const result = await repository.create('host123');

      expect(prisma.draftListing.create).toHaveBeenCalledWith({
        data: { hostId: 'host123' },
      });
      expect(result).toEqual({ listingId: 'new-id' });
    });
  });

  describe('findAll', () => {
    it('should return sanitized draft listings', async () => {
      jest.spyOn(prisma.draftListing, 'findMany').mockResolvedValue([mockPrismaDraft]);

      const result = await repository.findAll('host123');

      expect(prisma.draftListing.findMany).toHaveBeenCalledWith({
        where: { hostId: 'host123' },
        orderBy: { updatedAt: 'desc' },
      });
      expect(result[0].id).toBe(mockPrismaDraft.id);
      expect(result[0].location.city).toBe('City');
    });

    it('should handle empty location by providing defaults', async () => {
      const draftWithEmptyLoc = { ...mockPrismaDraft, location: {} };
      jest.spyOn(prisma.draftListing, 'findMany').mockResolvedValue([draftWithEmptyLoc as any]);

      const result = await repository.findAll('host123');

      expect(result[0].location.city).toBe('');
      expect(result[0].location.lat).toBe(0);
    });
  });

  describe('findById', () => {
    it('should return sanitized draft if found', async () => {
      jest.spyOn(prisma.draftListing, 'findFirst').mockResolvedValue(mockPrismaDraft);

      const result = await repository.findById('host123', 'draft123');

      expect(result?.id).toBe(mockPrismaDraft.id);
    });

    it('should return null if not found', async () => {
      jest.spyOn(prisma.draftListing, 'findFirst').mockResolvedValue(null);

      const result = await repository.findById('host123', 'draft123');

      expect(result).toBeNull();
    });
  });

  describe('findDraftOrThrow', () => {
    it('should return sanitized draft if found', async () => {
      jest.spyOn(prisma.draftListing, 'findUnique').mockResolvedValue(mockPrismaDraft);

      const result = await repository.findDraftOrThrow('host123', 'draft123');

      expect(result.id).toBe(mockPrismaDraft.id);
    });

    it('should throw NotFoundException if not found', async () => {
      jest.spyOn(prisma.draftListing, 'findUnique').mockResolvedValue(null);

      await expect(repository.findDraftOrThrow('host123', 'draft123')).rejects.toThrow(NotFoundException);
    });
  });

  describe('publishDraft', () => {
    it('should create a listing and delete the draft in a transaction', async () => {
      const mockTx = {
        listing: { create: jest.fn().mockResolvedValue({ id: 'listing123' }) },
        listingAmenity: { createMany: jest.fn() },
        draftListing: { delete: jest.fn() },
      };
      jest.spyOn(prisma, '$transaction').mockImplementation(cb => cb(mockTx as any));

      const draftToPublish = { ...mockPrismaDraft, location: mockPrismaDraft.location as any, amenities: ['a1'] };
      const result = await repository.publishDraft(draftToPublish as any);

      expect(mockTx.listing.create).toHaveBeenCalled();
      expect(mockTx.listingAmenity.createMany).toHaveBeenCalledWith({
        data: [{ listingId: 'listing123', amenityId: 'a1' }],
      });
      expect(mockTx.draftListing.delete).toHaveBeenCalledWith({ where: { id: 'draft123' } });
      expect(result).toEqual({ listingId: 'listing123' });
    });
  });
});
