import { ApiProperty } from '@nestjs/swagger';

export class createOrganizationDto {
  @ApiProperty({
    example: 'mex-org',
    description: 'name for organization',
  })
  name: string;

  @ApiProperty({
    example: 604,
    description: 'status fro organization',
  })
  status: number;
}

export class resCreateOrganizationDto {
  @ApiProperty({
    example: '6b1566e1-8cb2-4c3a-b33f-2a3b6bd7d641',
    description: 'id for organization',
  })
  id_organization: string;

  @ApiProperty({
    example: 'mex-org',
    description: 'name for organization',
  })
  name: string;

  @ApiProperty({
    example: 604,
    description: 'status fro organization',
  })
  status: number;
}

export class resDeleteOrganizationDto {
  @ApiProperty({
    example: '[]',
  })
  raw: [];

  @ApiProperty({
    example: 1,
    description: 'number of affected rows',
  })
  affected: number;
}

export class resUpdateganizationDto {
  @ApiProperty({
    example: '[]',
  })
  generatedMaps: [];

  @ApiProperty({
    example: '[]',
  })
  raw: [];

  @ApiProperty({
    example: 1,
    description: 'number of affected rows',
  })
  affected: number;
}

export class updateOrganizationDto {
  @ApiProperty({
    example: 'mex-org',
    description: 'name for organization',
  })
  name?: string;

  @ApiProperty({
    example: 604,
    description: 'status fro organization',
  })
  status?: number;
}
