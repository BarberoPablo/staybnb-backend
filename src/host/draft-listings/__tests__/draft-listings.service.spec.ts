/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/unbound-method */
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AmenitiesRepository } from '@src/amenities/repositories/amenities.repository';
import { DraftListingsService } from '@src/host/draft-listings/draft-listings.service';
import { DraftListing } from '@src/host/draft-listings/dto/draft-listing.types';
import { DraftListingsRepository } from '@src/host/draft-listings/repositories/draft-listings.repository';
import * as validation from '@src/host/draft-listings/validation/validate-complete-draft';

describe('DraftListingsService', () => {
  let service: DraftListingsService;
  let repository: DraftListingsRepository;
  let amenitiesRepository: AmenitiesRepository;

  const mockDraftListing: DraftListing = {
    id: 'draft123',
    hostId: 'host123',
    amenities: ['amenity1'],
    title: 'Title',
    description: 'Description',
    nightPrice: 40,
    images: ['img1'],
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
          provide: DraftListingsRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            findDraftOrThrow: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            publishDraft: jest.fn(),
          },
        },
        {
          provide: AmenitiesRepository,
          useValue: {
            countByIds: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DraftListingsService>(DraftListingsService);
    repository = module.get<DraftListingsRepository>(DraftListingsRepository);
    amenitiesRepository = module.get<AmenitiesRepository>(AmenitiesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new draft listing', async () => {
      const mockResponse = { listingId: 'new-id', success: true };
      jest
        .spyOn(repository, 'create')
        .mockResolvedValue({ listingId: 'new-id' });

      const result = await service.create('host123');

      expect(repository.create).toHaveBeenCalledWith('host123');
      expect(result).toEqual(mockResponse);
    });
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
        .mockReturnValue(mockDraftListing as any);
      jest.spyOn(amenitiesRepository, 'countByIds').mockResolvedValue(1);
      const mockResult = { listingId: 'listing123' };
      jest.spyOn(repository, 'publishDraft').mockResolvedValue(mockResult);

      const result = await service.complete(hostId, draftId);

      expect(repository.findDraftOrThrow).toHaveBeenCalledWith(hostId, draftId);
      expect(amenitiesRepository.countByIds).toHaveBeenCalledWith(['amenity1']);
      expect(repository.publishDraft).toHaveBeenCalledWith(mockDraftListing);
      expect(result).toBe(mockResult);
    });

    it('should throw BadRequestException if amenities are invalid', async () => {
      jest
        .spyOn(repository, 'findDraftOrThrow')
        .mockResolvedValue(mockDraftListing);
      jest
        .spyOn(validation, 'validateDraftForCompletion')
        .mockReturnValue(mockDraftListing as any);
      jest.spyOn(amenitiesRepository, 'countByIds').mockResolvedValue(0);

      await expect(service.complete(hostId, draftId)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findAll', () => {
    it('should return all draft listings for a host', async () => {
      const mockDrafts = [mockDraftListing];
      jest.spyOn(repository, 'findAll').mockResolvedValue(mockDrafts);

      const result = await service.findAll('host123');

      expect(repository.findAll).toHaveBeenCalledWith('host123');
      expect(result).toBe(mockDrafts);
    });
  });

  describe('find', () => {
    it('should return a draft listing by id', async () => {
      jest.spyOn(repository, 'findById').mockResolvedValue(mockDraftListing);

      const result = await service.find('host123', 'draft123');

      expect(repository.findById).toHaveBeenCalledWith('host123', 'draft123');
      expect(result).toBe(mockDraftListing);
    });

    it('should throw NotFoundException if draft not found', async () => {
      jest.spyOn(repository, 'findById').mockResolvedValue(null);

      await expect(service.find('host123', 'draft123')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a draft listing', async () => {
      jest.spyOn(repository, 'findById').mockResolvedValue(mockDraftListing);
      const updateSpy = jest.spyOn(repository, 'update').mockResolvedValue();

      const dto = { title: 'New Title' };
      await service.update('host123', 'draft123', 0, dto);

      expect(updateSpy).toHaveBeenCalledWith(
        'host123',
        'draft123',
        expect.objectContaining({
          title: 'New Title',
          currentStep: 0,
          visitedSteps: { set: [0] },
        }),
      );
    });

    it('should throw BadRequestException if step is invalid', async () => {
      await expect(
        service.update('host123', 'draft123', 999, {}),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('autoComplete', () => {
    it('should autocomplete a draft listing', async () => {
      jest.spyOn(repository, 'findById').mockResolvedValue(mockDraftListing);
      const updateSpy = jest.spyOn(repository, 'update').mockResolvedValue();

      await service.autoComplete('draft123', 'host123');

      expect(updateSpy).toHaveBeenCalledWith(
        'host123',
        'draft123',
        expect.any(Object),
      );
    });
  });

  describe('remove', () => {
    it('should remove a draft listing', async () => {
      jest.spyOn(repository, 'findById').mockResolvedValue(mockDraftListing);
      const deleteSpy = jest.spyOn(repository, 'delete').mockResolvedValue();

      await service.remove('host123', 'draft123');

      expect(deleteSpy).toHaveBeenCalledWith('host123', 'draft123');
    });

    it('should throw NotFoundException if draft not found', async () => {
      jest.spyOn(repository, 'findById').mockResolvedValue(null);

      await expect(service.remove('host123', 'draft123')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
