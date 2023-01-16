import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { organization } from './domain/entities/organization.entity';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';

@Module({
  imports: [TypeOrmModule.forFeature([organization])],
  controllers: [OrganizationController],
  providers: [OrganizationService]
})
export class OrganizationModule {}
