import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsService } from '@src/reservations/reservations.service';
import { PrismaService } from '@src/prisma/prisma.service';
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { ListingStatus, PropertyType, PrivacyType } from '@prisma/client';
import { AuthUser } from '@src/auth/auth-user';

const mockPrismaService = {
  listing: {
    findUnique: jest.fn(),
  },
  reservation: {
    findMany: jest.fn(),
    create: jest.fn(),
  },
};

const mockUser: AuthUser = {
  id: 'user-id',
  supabaseId: 'supabase-user-id',
  role: 'USER',
};

const mockListing = {
  id: 'listing-id',
  status: ListingStatus.PUBLISHED,
  hostId: 'host-id',
  nightPrice: 100,
  maxAdults: 2,
  maxChildren: 2,
  maxInfants: 1,
  maxPets: 1,
  maxGuests: 4,
  promotions: [
    {
      minNights: 5,
      discountPercentage: 10,
      description: '10% off for 5+ nights',
    },
    {
      minNights: 2,
      discountPercentage: 5,
      description: '5% off for 2+ nights',
    },
  ],
  beds: 1,
  bedrooms: 1,
  bathrooms: 1,
  title: 'Test Listing',
  description: 'Test Description',
  images: [],
  score: [],
  city: 'Test City',
  country: 'Test Country',
  lat: 0,
  lng: 0,
  location: {},
  checkInTime: '15:00',
  checkOutTime: '11:00',
  minCancelDays: 3,
  privacyType: PrivacyType.PRIVATE,
  propertyType: PropertyType.HOUSE,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('ReservationsService', () => {
  let service: ReservationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ReservationsService>(ReservationsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + 1); // Tomorrow
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 2); // Day after tomorrow

    const createReservationDto = {
      startDate,
      endDate,
      guests: { adults: 2, children: 0, infant: 0, pets: 0 },
    };

    it('should create a reservation successfully', async () => {
      mockPrismaService.listing.findUnique.mockResolvedValue(mockListing);
      mockPrismaService.reservation.findMany.mockResolvedValue([]);
      mockPrismaService.reservation.create.mockResolvedValue({
        ...createReservationDto,
        id: 'reservation-id',
        listingId: mockListing.id,
        userId: mockUser.id,
        totalPrice: 100,
        totalNights: 1,
        nightPrice: 100,
        discount: null,
        discountPercentage: null,
      });

      const result = await service.create(
        mockListing.id,
        createReservationDto,
        mockUser,
      );

      expect(result).toBeDefined();
      expect(mockPrismaService.listing.findUnique).toHaveBeenCalledWith({
        where: { id: mockListing.id },
      });
      expect(mockPrismaService.reservation.create).toHaveBeenCalled();
      expect(result.listingId).toBe(mockListing.id);
      expect(result.userId).toBe(mockUser.id);
      expect(result.totalPrice).toBe(100);
      expect(result.discount).toBeNull();
      expect(result.discountPercentage).toBeNull();
    });

    it('should apply the correct promotion for a valid number of nights', async () => {
      const promotionStartDate = new Date(today);
      promotionStartDate.setDate(today.getDate() + 1); // Tomorrow
      const promotionEndDate = new Date(today);
      promotionEndDate.setDate(today.getDate() + 4); // 3 nights stay (day 1 to day 4)

      const promotionReservationDto = {
        startDate: promotionStartDate,
        endDate: promotionEndDate,
        guests: { adults: 1, children: 0, infant: 0, pets: 0 },
      };

      const expectedNights = 3; // From promotionStartDate to promotionEndDate
      const expectedBasePrice = mockListing.nightPrice * expectedNights; // 100 * 3 = 300
      const expectedDiscountPercentage = 5; // For 2+ nights
      const expectedDiscount =
        (expectedBasePrice * expectedDiscountPercentage) / 100; // 300 * 0.05 = 15
      const expectedTotalPrice = expectedBasePrice - expectedDiscount; // 300 - 15 = 285

      mockPrismaService.listing.findUnique.mockResolvedValue(mockListing);
      mockPrismaService.reservation.findMany.mockResolvedValue([]);
      mockPrismaService.reservation.create.mockResolvedValue({
        ...promotionReservationDto,
        id: 'reservation-with-promo-id',
        listingId: mockListing.id,
        userId: mockUser.id,
        totalPrice: expectedTotalPrice,
        totalNights: expectedNights,
        nightPrice: mockListing.nightPrice,
        discount: expectedDiscount,
        discountPercentage: expectedDiscountPercentage,
      });

      const result = await service.create(
        mockListing.id,
        promotionReservationDto,
        mockUser,
      );

      expect(result).toBeDefined();
      expect(result.totalPrice).toBe(expectedTotalPrice);
      expect(result.totalNights).toBe(expectedNights);
      expect(result.discount).toBe(expectedDiscount);
      expect(result.discountPercentage).toBe(expectedDiscountPercentage);
      expect(mockPrismaService.reservation.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            totalPrice: expectedTotalPrice,
            totalNights: expectedNights,
            discount: expectedDiscount,
            discountPercentage: expectedDiscountPercentage,
          }),
        }),
      );
    });

    it('should throw BadRequestException for start date in the past', async () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);
      await expect(
        service.create(
          mockListing.id,
          { ...createReservationDto, startDate: pastDate },
          mockUser,
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException for end date before start date', async () => {
      await expect(
        service.create(
          mockListing.id,
          { ...createReservationDto, endDate: createReservationDto.startDate },
          mockUser,
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if listing not found', async () => {
      mockPrismaService.listing.findUnique.mockResolvedValue(null);
      await expect(
        service.create(mockListing.id, createReservationDto, mockUser),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if listing is not published', async () => {
      mockPrismaService.listing.findUnique.mockResolvedValue({
        ...mockListing,
        status: ListingStatus.PENDING,
      });
      await expect(
        service.create(mockListing.id, createReservationDto, mockUser),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw ForbiddenException if user books their own listing', async () => {
      mockPrismaService.listing.findUnique.mockResolvedValue({
        ...mockListing,
        hostId: mockUser.id,
      });
      await expect(
        service.create(mockListing.id, createReservationDto, mockUser),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should throw BadRequestException if guests exceed limit', async () => {
      mockPrismaService.listing.findUnique.mockResolvedValue(mockListing);
      await expect(
        service.create(
          mockListing.id,
          {
            ...createReservationDto,
            guests: { ...createReservationDto.guests, adults: 5 },
          },
          mockUser,
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException for conflicting reservations', async () => {
      mockPrismaService.listing.findUnique.mockResolvedValue(mockListing);
      mockPrismaService.reservation.findMany.mockResolvedValue([
        { id: 'another-reservation' },
      ]);
      await expect(
        service.create(mockListing.id, createReservationDto, mockUser),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
