import { ApiProperty } from '@nestjs/swagger';

export class AmenityResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  category: string;
}
