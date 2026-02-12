import { Test, TestingModule } from '@nestjs/testing';
import { DraftListingsController } from '../draft-listings.controller';
import { DraftListingsService } from '../draft-listings.service';
import { UserRole } from '@prisma/client';
import { AuthGuard } from '@src/auth/auth.guard';

describe('DraftListingsController', () => {
  let controller: DraftListingsController;
  let service: DraftListingsService;

  const mockDraftListingsService = {
    remove: jest.fn(),
  };

  const mockAuthGuard = {
    canActivate: jest.fn(() => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DraftListingsController],
      providers: [
        {
          provide: DraftListingsService,
          useValue: mockDraftListingsService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .compile();

    controller = module.get<DraftListingsController>(DraftListingsController);
    service = module.get<DraftListingsService>(DraftListingsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('remove', () => {
    it('should call the service remove method with correct parameters and return success', async () => {
      const userId = 'user123';
      const draftId = 'draft456';
      const supabaseId = '';

      mockDraftListingsService.remove.mockResolvedValue(undefined);

      const result = await controller.remove(
        { id: userId, role: UserRole.USER, supabaseId },
        draftId,
      );
      expect(mockDraftListingsService.remove).toHaveBeenCalledWith(
        userId,
        draftId,
      );
      expect(result).toEqual({ success: true });
    });

    it('should propagate errors from the service', async () => {
      const userId = 'user123';
      const draftId = 'draft456';
      const supabaseId = '';

      const error = new Error('Service error');
      mockDraftListingsService.remove.mockRejectedValue(error);

      await expect(
        controller.remove(
          { id: userId, role: UserRole.USER, supabaseId },
          draftId,
        ),
      ).rejects.toThrow(error);
      expect(mockDraftListingsService.remove).toHaveBeenCalledWith(
        userId,
        draftId,
      );
    });
  });
});
