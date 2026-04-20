import { ApiProperty, PartialType } from '@nestjs/swagger';
import { PrivacyType, PropertyType } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

export interface PromotionInterface {
  minNights: number;
  discountPercentage: number;
  description: string;
}

export class PromotionInputDto implements PromotionInterface {
  @IsInt()
  @Min(1)
  minNights: number;

  @IsInt()
  @Min(1)
  @Max(99)
  discountPercentage: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  description: string;
}

export class StructureInputDto {
  @IsInt()
  @Min(1)
  guests: number;

  @IsInt()
  @Min(0)
  bedrooms: number;

  @IsInt()
  @Min(0)
  beds: number;

  @IsInt()
  @Min(0)
  bathrooms: number;
}

export class GuestLimitRangeDto {
  @IsInt()
  @Min(0)
  min: number;

  @IsInt()
  @Min(0)
  @Max(50)
  max: number;
}

export class GuestLimitsInputDto {
  @ValidateNested()
  @Type(() => GuestLimitRangeDto)
  adults: GuestLimitRangeDto;

  @ValidateNested()
  @Type(() => GuestLimitRangeDto)
  children: GuestLimitRangeDto;

  @ValidateNested()
  @Type(() => GuestLimitRangeDto)
  infant: GuestLimitRangeDto;

  @ValidateNested()
  @Type(() => GuestLimitRangeDto)
  pets: GuestLimitRangeDto;
}

export interface LocationInterface {
  lat: number;
  lng: number;
  city: string;
  state: string;
  street: string;
  country: string;
  postcode: string;
  timezone: string;
  formatted: string;
  housenumber: string;
}

export class LocationInputDto implements LocationInterface {
  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  country: string;

  @IsString()
  @IsNotEmpty()
  postcode: string;

  @IsString()
  @IsNotEmpty()
  timezone: string;

  @IsString()
  @IsNotEmpty()
  formatted: string;

  @IsString()
  @IsNotEmpty()
  housenumber: string;
}

export class UpdateListingDto {
  @ApiProperty()
  @IsString()
  @MinLength(10)
  @MaxLength(100)
  title: string;

  @ApiProperty()
  @IsString()
  @MinLength(20)
  @MaxLength(2000)
  description: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  nightPrice: number;

  @ApiProperty({ enum: PropertyType })
  @IsEnum(PropertyType)
  propertyType: PropertyType;

  @ApiProperty({ enum: PrivacyType })
  @IsEnum(PrivacyType)
  privacyType: PrivacyType;

  @ApiProperty()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'Invalid check-in time (use HH:MM)',
  })
  checkInTime: string;

  @ApiProperty()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'Invalid check-out time (use HH:MM)',
  })
  checkOutTime: string;

  @ApiProperty()
  @IsInt()
  @Min(0)
  minCancelDays: number;

  @ApiProperty({ type: StructureInputDto })
  @ValidateNested()
  @Type(() => StructureInputDto)
  structure: StructureInputDto;

  @ApiProperty({ type: GuestLimitsInputDto })
  @ValidateNested()
  @Type(() => GuestLimitsInputDto)
  guestLimits: GuestLimitsInputDto;

  @ApiProperty({ type: [String] })
  @IsArray()
  @ArrayMinSize(5)
  @ArrayMaxSize(20)
  @IsUrl({}, { each: true })
  images: string[];

  @ApiProperty({ type: [PromotionInputDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PromotionInputDto)
  promotions: PromotionInterface[];

  @ApiProperty({ type: LocationInputDto })
  @ValidateNested()
  @Type(() => LocationInputDto)
  location: LocationInterface;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  amenities: string[];
}

export class PartialUpdateListingDto extends PartialType(UpdateListingDto) {}

export class SuccessResponseDto {
  @ApiProperty()
  success: boolean;
}
