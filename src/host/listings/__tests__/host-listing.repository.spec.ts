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
    title: 'Listing 1',
    description: 'Desc 1',
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
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HostListingRepository,
        {
          provide: PrismaService,
          useValue: {
            listing: {
              findMany: jest.fn(),
              findFirst: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
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
        include: { amenities: true },
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
});
