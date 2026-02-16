import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  lastName: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  avatarUrl: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  bio: string;
}
