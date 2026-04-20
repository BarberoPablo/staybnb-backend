import { Test, TestingModule } from '@nestjs/testing';
import { ListingStatus } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';
import { HostListingRepository } from '@src/host/listings/repositories/host-listing.repository';
import { NotFoundException } from '@nestjs/common';

describe('HostListingRepository', () => {
  let repository: HostListingRepository;
  let prisma: PrismaService;

  const mockPrismaListing = {
    id: '1',
    title: 'Beautiful Beachfront Villa with Pool',
    description:
      'This is a very long description to satisfy the new validation rules of the listing.',
    nightPrice: 100,
    images: [],
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    maxGuests: 2,
    maxAdults: 2,
    maxChildren: 0,
    maxInfants: 0,
    maxPets: 0,
    checkInTime: '15:00',
    checkOutTime: '11:00',
    minCancelDays: 3,
    location: {
      formatted: 'Formatted',
      housenumber: '1',
      street: 'Street',
      state: 'State',
      postcode: '123',
      timezone: 'Timezone',
    },
    city: 'City',
    country: 'Country',
    lat: 0,
    lng: 0,
    promotions: [],
    propertyType: 'HOUSE',
    privacyType: 'ENTIRE',
    status: ListingStatus.PUBLISHED,
    createdAt: new Date(),
    updatedAt: new Date(),
    hostId: 'host-1',
    amenities: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HostListingRepository,
        {
          provide: PrismaService,
          useValue: {
            $transaction: jest.fn(),
            listing: {
              findMany: jest.fn(),
              findFirst: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
            },
            listingAmenity: {
              deleteMany: jest.fn(),
              createMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<HostListingRepository>(HostListingRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('findByHostId', () => {
    it('should return mapped listings for a host', async () => {
      const mockListings = [mockPrismaListing];
      (prisma.listing.findMany as jest.Mock).mockResolvedValue(mockListings);

      const result = await repository.findHostListings('host-1');

      expect(prisma.listing.findMany).toHaveBeenCalledWith({
        where: { hostId: 'host-1' },
        select: {
          id: true,
          status: true,
          images: true,
          title: true,
          description: true,
          city: true,
          country: true,
          nightPrice: true,
          propertyType: true,
          privacyType: true,
        },
        orderBy: { updatedAt: 'desc' },
      });
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('1');
    });
  });

  describe('findById', () => {
    it('should return mapped listing if found', async () => {
      (prisma.listing.findFirst as jest.Mock).mockResolvedValue(
        mockPrismaListing,
      );

      const result = await repository.findHostListing('host-1', '1');

      expect(prisma.listing.findFirst).toHaveBeenCalledWith({
        where: { hostId: 'host-1', id: '1' },
        include: { amenities: true },
      });
      expect(result.id).toBe('1');
    });

    it('should throw NotFoundException if not found', async () => {
      (prisma.listing.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(repository.findHostListing('host-1', '1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findRawById', () => {
    it('should return raw listing', async () => {
      (prisma.listing.findUnique as jest.Mock).mockResolvedValue(
        mockPrismaListing,
      );

      const result = await repository.findRawById('1');

      expect(prisma.listing.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
        select: {
          id: true,
          hostId: true,
          status: true,
        },
      });
      expect(result).toEqual(mockPrismaListing);
    });
  });

  describe('updateStatus', () => {
    it('should update listing status', async () => {
      await repository.updateStatus('1', ListingStatus.PENDING);

      expect(prisma.listing.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { status: ListingStatus.PENDING },
      });
    });
  });

  describe('update', () => {
    it('should update listing with PENDING status', async () => {
      const updateDto = {
        title: 'Updated Title with enough characters',
        amenities: ['amenity-1'],
        location: {
          city: 'New City',
          country: 'New Country',
          lat: 10,
          lng: 20,
          formatted: 'New Formatted',
          housenumber: '10',
          street: 'New Street',
          state: 'New State',
          postcode: '456',
          timezone: 'New Timezone',
        },
      };

      (prisma.$transaction as jest.Mock).mockImplementation(async (cb) =>
        cb(prisma),
      );

      await repository.update('1', updateDto);

      expect(prisma.listingAmenity.deleteMany).toHaveBeenCalledWith({
        where: { listingId: '1' },
      });
      expect(prisma.listingAmenity.createMany).toHaveBeenCalledWith({
        data: [{ listingId: '1', amenityId: 'amenity-1' }],
      });
      expect(prisma.listing.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: expect.objectContaining({
          title: updateDto.title,
          status: ListingStatus.PENDING,
          city: updateDto.location.city,
        }),
        include: { amenities: true },
      });
    });
  });
});
