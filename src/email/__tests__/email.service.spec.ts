import { Logger } from '@nestjs/common'; // Keep the import for Logger
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { RESEND_CLIENT } from '@src/email/email.constants';
import { EmailService } from '@src/email/email.service';
import { ReservationConfirmationEmail } from '@src/email/templates/reservation-confirmation.template';
import { ReservationEmailData } from '@src/email/types';

// Mock the Resend client
const mockResendClient = {
  emails: {
    send: jest.fn(),
  },
};

// Mock the ConfigService
const mockConfigService = {
  get: jest.fn((key: string) => {
    if (key === 'FRONTEND_URL') {
      return 'http://localhost:3000';
    }
    return null;
  }),
};

describe('EmailService', () => {
  let service: EmailService;
  let loggerLogSpy: jest.SpyInstance;
  let loggerErrorSpy: jest.SpyInstance;

  beforeEach(async () => {
    // Spy on the prototype methods of Logger
    loggerLogSpy = jest
      .spyOn(Logger.prototype, 'log')
      .mockImplementation(() => {});
    loggerErrorSpy = jest
      .spyOn(Logger.prototype, 'error')
      .mockImplementation(() => {});

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        {
          provide: RESEND_CLIENT,
          useValue: mockResendClient,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
    jest.clearAllMocks(); // Clear mocks after getting instances
  });

  afterEach(() => {
    loggerLogSpy.mockRestore();
    loggerErrorSpy.mockRestore();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const mockEmailData: ReservationEmailData = {
    userEmail: 'pablobarbero220@gmail.com',
    userName: 'John Doe',
    reservationId: 'res_123',
    startDate: new Date('2026-03-01'),
    endDate: new Date('2026-03-05'),
    guests: { adults: 2, children: 1 },
    totalNights: 4,
    totalPrice: 400,
    nightPrice: 100,
    listingId: 'listing_123', // Updated to string
    listingTitle: 'Cozy Apartment',
    listingImages: ['http://example.com/image1.jpg'],
    listingAddress: '123 Main St',
    checkInTime: '15:00',
    checkOutTime: '11:00',
    hostName: 'Jane Smith',
  };

  describe('sendReservationConfirmationEmail', () => {
    it('should send an email successfully', async () => {
      mockResendClient.emails.send.mockResolvedValue({
        data: { id: 'email_123', from: 'sender', to: ['test@example.com'] },
        error: null,
      });

      const result =
        await service.sendReservationConfirmationEmail(mockEmailData);

      expect(result.success).toBe(true);
      expect(result.messageId).toBe('email_123');
      expect(mockResendClient.emails.send).toHaveBeenCalledTimes(1);
      expect(mockResendClient.emails.send).toHaveBeenCalledWith({
        from: 'Staybnb <staybnb@resend.dev>',
        to: [mockEmailData.userEmail],
        subject: `Reservation Confirmed - ${mockEmailData.listingTitle}`,
        react: ReservationConfirmationEmail({
          ...mockEmailData,
          frontendUrl: 'http://localhost:3000',
        }),
      });
      expect(mockConfigService.get).toHaveBeenCalledWith('FRONTEND_URL');
      expect(loggerLogSpy).toHaveBeenCalledWith(
        `Email sent successfully: email_123`,
      );
    });

    it('should return success: false if Resend API returns an error', async () => {
      const resendError = {
        name: 'ResendError',
        message: 'API key invalid',
        statusCode: 401,
      };
      mockResendClient.emails.send.mockResolvedValue({
        data: null,
        error: resendError,
      });

      const result =
        await service.sendReservationConfirmationEmail(mockEmailData);

      expect(result.success).toBe(false);
      expect(result.error).toBe(resendError.message);
      expect(mockResendClient.emails.send).toHaveBeenCalledTimes(1);
      expect(mockConfigService.get).toHaveBeenCalledWith('FRONTEND_URL');
      expect(loggerErrorSpy).toHaveBeenCalledWith(
        'Resend API error:',
        resendError,
      );
    });

    it('should return success: false if an unexpected error occurs', async () => {
      const unexpectedError = new Error(
        'Something went wrong during email preparation',
      );
      mockResendClient.emails.send.mockImplementation(() => {
        throw unexpectedError;
      });

      const result =
        await service.sendReservationConfirmationEmail(mockEmailData);

      expect(result.success).toBe(false);
      expect(result.error).toBe(unexpectedError.message);
      expect(mockResendClient.emails.send).toHaveBeenCalledTimes(1);
      expect(mockConfigService.get).toHaveBeenCalledWith('FRONTEND_URL');
      expect(loggerErrorSpy).toHaveBeenCalledWith(
        'Error sending reservation confirmation email:',
        unexpectedError,
      );
    });
  });
});
