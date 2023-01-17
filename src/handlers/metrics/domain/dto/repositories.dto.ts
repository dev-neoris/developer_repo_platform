import { ApiProperty } from '@nestjs/swagger';

export class repositoriesDB {
  @ApiProperty({ example: '6eeab31a-549f-45dc-9cff-ae653f8672ba' })
  id: string;

  @ApiProperty({ example: 'chatbot_web-gui' })
  name: string;

  @ApiProperty({ example: 'COE' })
  tribe: string;

  @ApiProperty({ example: 'Colombia' })
  organization: string;

  @ApiProperty({ example: 80.79 })
  coverage: number;

  @ApiProperty({ example: '3' })
  codesmells: string;

  @ApiProperty({ example: '2' })
  bugs: string;

  @ApiProperty({ example: '1' })
  vulnerabilities: string;

  @ApiProperty({ example: '0' })
  hotspots: string;

  @ApiProperty({ example: 'Verificado' })
  verificationstate: string;

  @ApiProperty({ example: 'Habilitado' })
  state: string;
}
