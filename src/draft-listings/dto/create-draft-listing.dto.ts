import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDraftListingDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  pricePerNight?: number;
}
