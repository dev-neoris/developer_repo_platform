import { Organization } from 'src/handlers/organization/domain/entities/organization.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Repository } from './repository.entity';

@Entity()
export class Tribe {
  @PrimaryGeneratedColumn('uuid')
  id_tribe: string;

  @Column({ type: 'char', length: 50, nullable: false })
  name: string;

  @Column({ type: 'bigint', nullable: false })
  status: number;

  @ManyToOne(() => Organization, (organization) => organization.tribes, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'id_organization' })
  organization: Organization[];

  @OneToMany(() => Repository, (repository) => repository.tribe)
  repository: Repository[];
}
