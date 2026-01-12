import { IsString, MinLength } from 'class-validator';

export class RejectListingDto {
  @IsString()
  @MinLength(5)
  reason: string;
}
