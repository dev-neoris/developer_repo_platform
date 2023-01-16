import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class createOrganizationDto {

      @ApiProperty({
        example: 'mex-org', 
        description: 'name for organization',
      })
      name: string;
    
      @ApiProperty({
        example: '604', 
        description: 'status fro organization',
      })
      status: number;
}