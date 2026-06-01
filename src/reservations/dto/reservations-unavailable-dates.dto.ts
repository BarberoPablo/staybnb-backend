import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class ListingUnavailableDatesDto {
  @ApiProperty({ type: [String], example: ['2026-05-25'] })
  @IsArray()
  @IsString({ each: true })
  unavailableCheckInDates: string[];

  @ApiProperty({ type: [String], example: ['2026-05-27'] })
  @IsArray()
  @IsString({ each: true })
  unavailableCheckOutDates: string[];
}
