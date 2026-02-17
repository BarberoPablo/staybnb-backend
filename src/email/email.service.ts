import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ReservationConfirmationEmail } from '@src/email/templates/reservation-confirmation.template';
import { EmailResult, ReservationEmailData } from '@src/email/types';
import { ReactElement } from 'react';
import { Resend } from 'resend';
import { RESEND_CLIENT } from './email.constants';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(
    @Inject(RESEND_CLIENT) private readonly resend: Resend,
    private readonly configService: ConfigService,
  ) {}

  async sendReservationConfirmationEmail(
    data: ReservationEmailData,
  ): Promise<EmailResult> {
    try {
      const frontendUrl = this.configService.get<string>('FRONTEND_URL');

      if (!frontendUrl) {
        throw new Error('FRONTEND_URL is not defined');
      }

      const emailContent = ReservationConfirmationEmail({
        ...data,
        frontendUrl,
      });

      const result = await this.resend.emails.send({
        from: 'Staybnb <staybnb@resend.dev>',
        to: [data.userEmail],
        subject: `Reservation Confirmed - ${data.listingTitle}`,
        react: emailContent as ReactElement,
      });

      if (result.error) {
        this.logger.error('Resend API error:', result.error);
        return {
          success: false,
          error: result.error.message || 'Failed to send email',
        };
      }

      this.logger.log(`Email sent successfully: ${result.data?.id}`);
      return {
        success: true,
        messageId: result.data?.id,
      };
    } catch (error) {
      this.logger.error('Error sending reservation confirmation email:', error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }
}
