import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Repository } from './repository.entity';

@Entity()
export class Metrics {
  @Column({ type: 'double precision', nullable: false })
  coverage: number;

  @Column({ type: 'bigint', nullable: false })
  bugs: number;

  @Column({ type: 'bigint', nullable: false })
  vulnerabilities: number;

  @Column({ type: 'bigint', nullable: false })
  hotspot: number;

  @Column({ type: 'bigint', nullable: false })
  code_smells: number;

  @PrimaryColumn('uuid')
  id_repository: string;

  @OneToOne(() => Repository, { cascade: true })
  @JoinColumn({ name: 'id_repository' })
  repository: Repository;
}
