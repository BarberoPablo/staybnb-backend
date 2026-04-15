import { ApiProperty } from '@nestjs/swagger';
import { ListingStatus, PrivacyType, PropertyType } from '@prisma/client';

export class HostListingLocationDto {
  @ApiProperty()
  country: string;

  @ApiProperty()
  city: string;
}

export class HostListingResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ enum: ListingStatus })
  status: ListingStatus;

  @ApiProperty({ type: [String] })
  images: string[];

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: HostListingLocationDto })
  location: HostListingLocationDto;

  @ApiProperty()
  nightPrice: number;

  @ApiProperty({ enum: PropertyType })
  propertyType: PropertyType;

  @ApiProperty({ enum: PrivacyType })
  privacyType: PrivacyType;
}
