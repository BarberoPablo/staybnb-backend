import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@src/prisma/prisma.service';
import { CitiesRepository } from '../repositories/cities.repository';

describe('CitiesRepository', () => {
  let repository: CitiesRepository;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CitiesRepository,
        {
          provide: PrismaService,
          useValue: {
            $queryRaw: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<CitiesRepository>(CitiesRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('findPopular', () => {
    it('should call $queryRaw with correct parameters', async () => {
      const mockRawCities = [
        {
          name: 'Paris',
          country: 'France',
          lat: 48.8566,
          lng: 2.3522,
          listingCount: 10,
          imageUrl: 'paris.jpg',
        },
      ];

      const queryRawSpy = jest
        .spyOn(prisma, '$queryRaw')
        .mockResolvedValue(mockRawCities);

      const result = await repository.findPopular({ take: 6, skip: 0 });

      expect(queryRawSpy).toHaveBeenCalled();
      expect(result).toEqual(mockRawCities);
    });
  });
});
