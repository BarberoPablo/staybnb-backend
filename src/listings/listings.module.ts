import { Module } from '@nestjs/common';
import { ListingsController } from '@src/listings/listings.controller';
import { ListingsService } from '@src/listings/listings.service';

@Module({
  controllers: [ListingsController],
  providers: [ListingsService],
})
export class ListingsModule {}
