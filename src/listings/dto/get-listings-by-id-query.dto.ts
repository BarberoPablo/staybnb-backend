import { IsOptional, IsString } from 'class-validator';

export class GetListingsByIdQueryDto {
  @IsOptional()
  @IsString()
  include?: string; // comma-separated
}
