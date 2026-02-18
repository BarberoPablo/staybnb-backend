import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsController } from '@src/reservations/reservations.controller';
import { ReservationsService } from '@src/reservations/reservations.service';
import { AuthUser } from '@src/auth/auth-user';
import { BadRequestException } from '@nestjs/common';

const mockReservationsService = {
  create: jest.fn(),
};

const mockUser: AuthUser = {
  id: 'user-id',
  supabaseId: 'supabase-user-id',
  role: 'USER',
  email: 'test@test.com',
};

describe('ReservationsController', () => {
  let controller: ReservationsController;
  let service: ReservationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationsController],
      providers: [
        {
          provide: ReservationsService,
          useValue: mockReservationsService,
        },
      ],
    }).compile();

    controller = module.get<ReservationsController>(ReservationsController);
    service = module.get<ReservationsService>(ReservationsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    const listingId = 'listing-id';
    const createReservationDto = {
      startDate: new Date(),
      endDate: new Date(),
      guests: { adults: 2, children: 0, infant: 0, pets: 0 },
    };

    it('should call reservations service create with correct params', async () => {
      const mockReservation = { id: 'reservation-id', ...createReservationDto };
      mockReservationsService.create.mockResolvedValue(mockReservation);

      const result = await controller.create(
        listingId,
        createReservationDto,
        mockUser,
      );

      expect(service.create).toHaveBeenCalledWith(
        listingId,
        createReservationDto,
        mockUser,
      );
      expect(result).toEqual(mockReservation);
    });

    it('should propagate exceptions from the service', async () => {
      mockReservationsService.create.mockRejectedValue(
        new BadRequestException(),
      );

      await expect(
        controller.create(listingId, createReservationDto, mockUser),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
