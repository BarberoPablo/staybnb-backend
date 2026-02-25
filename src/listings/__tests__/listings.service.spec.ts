import { Test, TestingModule } from '@nestjs/testing';
import { ListingStatus } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';
import { GetListingsQueryDto } from '@src/listings/dto/get-listings-query.dto';
import { ListingsService } from '@src/listings/listings.service';

describe('ListingsService', () => {
  let service: ListingsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListingsService,
        {
          provide: PrismaService,
          useValue: {
            listing: {
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ListingsService>(ListingsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('search', () => {
    it('should call findMany with default pagination if query is empty', async () => {
      const findManySpy = jest
        .spyOn(prisma.listing, 'findMany')
        .mockResolvedValue([]);

      const query: GetListingsQueryDto = {};
      await service.search(query);

      expect(findManySpy).toHaveBeenCalledWith({
        where: { status: ListingStatus.PUBLISHED },
        include: {
          amenities: true,
        },
        orderBy: { createdAt: 'desc' },
        take: 20,
        skip: 0,
      });
    });

    it('should call findMany with custom pagination if query is provided', async () => {
      const findManySpy = jest
        .spyOn(prisma.listing, 'findMany')
        .mockResolvedValue([]);

      const query: GetListingsQueryDto = { limit: 50, offset: 10 };
      await service.search(query);

      expect(findManySpy).toHaveBeenCalledWith({
        where: { status: ListingStatus.PUBLISHED },
        include: {
          amenities: true,
        },
        orderBy: { createdAt: 'desc' },
        take: 50,
        skip: 10,
      });
    });
  });
});
