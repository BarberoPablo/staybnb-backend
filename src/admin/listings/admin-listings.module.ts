import { Module } from '@nestjs/common';
import { AdminListingsController } from './admin-listings.controller';
import { AdminListingsService } from './admin-listings.service';

@Module({
  controllers: [AdminListingsController],
  providers: [AdminListingsService],
})
export class AdminListingsModule {}
