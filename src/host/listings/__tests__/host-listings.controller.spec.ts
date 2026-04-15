import { Test, TestingModule } from '@nestjs/testing';
import { HostListingsController } from '@src/host/listings/host-listings.controller';
import { HostListingsService } from '@src/host/listings/host-listings.service';
import { AuthUser } from '@src/auth/auth-user';
import { UserRole } from '@prisma/client';

describe('HostListingsController', () => {
  let controller: HostListingsController;
  let service: HostListingsService;

  const mockUser: AuthUser = {
    id: 'host-1',
    supabaseId: 'supabase-host-1',
    email: 'host@example.com',
    role: UserRole.USER,
  };

  const mockListingResponse = {
    id: '1',
    title: 'Listing 1',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HostListingsController],
      providers: [
        {
          provide: HostListingsService,
          useValue: {
            findByHostId: jest.fn(),
            findById: jest.fn(),
            resubmit: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<HostListingsController>(HostListingsController);
    service = module.get<HostListingsService>(HostListingsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should call service.findByHostId', async () => {
      (service.findHostListings as jest.Mock).mockResolvedValue([
        mockListingResponse,
      ]);

      const result = await controller.findAll(mockUser);

      expect(service.findHostListings).toHaveBeenCalledWith('host-1');
      expect(result).toEqual([mockListingResponse]);
    });
  });

  describe('resubmitListing', () => {
    it('should call service.resubmit', async () => {
      (service.resubmit as jest.Mock).mockResolvedValue({ success: true });

      const result = await controller.resubmitListing('1', mockUser);

      expect(service.resubmit).toHaveBeenCalledWith('1', 'host-1');
      expect(result).toEqual({ success: true });
    });
  });
});
