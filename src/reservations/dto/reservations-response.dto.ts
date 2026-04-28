import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsDate } from 'class-validator';

export class ListingUnavailableDatesDto {
  @ApiProperty({ type: [String], format: 'date-time' })
  @IsArray()
  @IsDate({ each: true })
  @Type(() => Date)
  unavailableCheckInDates: Date[];

  @ApiProperty({ type: [String], format: 'date-time' })
  @IsArray()
  @IsDate({ each: true })
  @Type(() => Date)
  unavailableCheckOutDates: Date[];
}
