import { Test, TestingModule } from '@nestjs/testing';
import { ListingStatus } from '@prisma/client';
import { HostListingsService } from '@src/host/listings/host-listings.service';
import { HostListingRepository } from '@src/host/listings/repositories/host-listing.repository';
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

describe('HostListingsService', () => {
  let service: HostListingsService;
  let repository: HostListingRepository;

  const mockListingResponse = {
    id: '1',
    title: 'Listing 1',
  };

  const mockRawListing = {
    id: '1',
    hostId: 'host-1',
    status: ListingStatus.REJECTED,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HostListingsService,
        {
          provide: HostListingRepository,
          useValue: {
            findByHostId: jest.fn(),
            findById: jest.fn(),
            findRawById: jest.fn(),
            updateStatus: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<HostListingsService>(HostListingsService);
    repository = module.get<HostListingRepository>(HostListingRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findByHostId', () => {
    it('should return listings from repository', async () => {
      (repository.findHostListings as jest.Mock).mockResolvedValue([
        mockListingResponse,
      ]);

      const result = await service.findHostListings('host-1');

      expect(repository.findHostListings).toHaveBeenCalledWith('host-1');
      expect(result).toEqual([mockListingResponse]);
    });
  });

  describe('resubmit', () => {
    it('should resubmit rejected listing', async () => {
      (repository.findRawById as jest.Mock).mockResolvedValue(mockRawListing);
      (repository.updateStatus as jest.Mock).mockResolvedValue(undefined);

      const result = await service.resubmit('1', 'host-1');

      expect(repository.findRawById).toHaveBeenCalledWith('1');
      expect(repository.updateStatus).toHaveBeenCalledWith(
        '1',
        ListingStatus.PENDING,
      );
      expect(result).toEqual({ success: true });
    });

    it('should throw NotFoundException if listing does not exist', async () => {
      (repository.findRawById as jest.Mock).mockResolvedValue(null);

      await expect(service.resubmit('1', 'host-1')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw ForbiddenException if host does not own the listing', async () => {
      (repository.findRawById as jest.Mock).mockResolvedValue({
        ...mockRawListing,
        hostId: 'other-host',
      });

      await expect(service.resubmit('1', 'host-1')).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should throw BadRequestException if listing is not rejected', async () => {
      (repository.findRawById as jest.Mock).mockResolvedValue({
        ...mockRawListing,
        status: ListingStatus.PUBLISHED,
      });

      await expect(service.resubmit('1', 'host-1')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if update fails', async () => {
      (repository.findRawById as jest.Mock).mockResolvedValue(mockRawListing);
      (repository.updateStatus as jest.Mock).mockRejectedValue(
        new Error('Update failed'),
      );

      await expect(service.resubmit('1', 'host-1')).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
