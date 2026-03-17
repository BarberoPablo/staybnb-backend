import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PopularDestinationDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  lat: number;

  @ApiProperty()
  lng: number;

  @ApiProperty()
  listingCount: number;

  @ApiPropertyOptional({ nullable: true })
  imageUrl?: string;
}
