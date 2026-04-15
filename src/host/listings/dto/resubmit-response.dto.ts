import { ApiProperty } from '@nestjs/swagger';

export class ResubmitResponseDto {
  @ApiProperty()
  success: boolean;
}
