import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProfileDto {
  // These fields would typically come from the user input on the frontend
  // during the onboarding process, after they've authenticated with Supabase.
  // For initial creation, they can be optional.
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;
}
