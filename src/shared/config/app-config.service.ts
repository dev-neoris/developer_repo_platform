import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  getStringEnv(name: string): string {
    return this.configService.get<string>(`app.${name}`);
  }

  getBooleanEnv(name: string): boolean {
    const booleanEnv = this.configService.get<string>(`app.${name}`);
    return /^true$/i.test(booleanEnv);
  }

  getNumberEnv(name: string): number {
    const integerEnv = this.configService.get<string>(`app.${name}`);
    return Number(integerEnv);
  }
}
