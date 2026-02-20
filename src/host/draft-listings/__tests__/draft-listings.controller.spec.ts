import { Test, TestingModule } from '@nestjs/testing';
import { UserRole } from '@prisma/client';
import { AuthGuard } from '@src/auth/auth.guard';
import { DraftListingsController } from '../draft-listings.controller';
import { DraftListingsService } from '../draft-listings.service';

describe('DraftListingsController', () => {
  let controller: DraftListingsController;

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
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('remove', () => {
    it('should call the service remove method with correct parameters and return success', async () => {
      const userId = 'user123';
      const draftId = 'draft456';
      const supabaseId = '';
      const email = 'test@test.com';

      mockDraftListingsService.remove.mockResolvedValue(undefined);

      const result = await controller.remove(
        { id: userId, role: UserRole.USER, supabaseId, email },
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
      const email = 'test@test.com';

      const error = new Error('Service error');
      mockDraftListingsService.remove.mockRejectedValue(error);

      await expect(
        controller.remove(
          { id: userId, role: UserRole.USER, supabaseId, email },
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
