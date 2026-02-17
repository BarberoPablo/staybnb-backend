import { Module } from '@nestjs/common';
import { PublicListingsController } from './listings.controller';
import { PublicListingsService } from './listings.service';

@Module({
  controllers: [PublicListingsController],
  providers: [PublicListingsService],
})
export class PublicListingsModule {}
