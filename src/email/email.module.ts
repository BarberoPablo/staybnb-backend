import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailService } from '@src/email/email.service';
import { Resend } from 'resend';
import { RESEND_CLIENT } from '@src/email/email.constants';

@Module({
  imports: [ConfigModule],
  providers: [
    EmailService,
    {
      provide: RESEND_CLIENT,
      useFactory: () => {
        return new Resend(process.env.RESEND_API_KEY);
      },
    },
  ],
  exports: [EmailService, RESEND_CLIENT],
})
export class EmailModule {}
