import { Tribe } from 'src/handlers/metrics/domain/entities/tribe.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id_organization: string;

  @Column({ type: 'char', length: 50, nullable: false })
  name: string;

  @Column({ type: 'bigint', nullable: false })
  status: number;

  @OneToMany(() => Tribe, (tribe) => tribe.organization)
  tribes: Tribe[];
}
