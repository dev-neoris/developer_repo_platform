import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';
import { Tribe } from './tribe.entity';

@Entity()
export class Repository {
  @PrimaryGeneratedColumn('uuid')
  id_repository: string;

  @Column({ type: 'char', length: 50, nullable: false })
  name: string;

  @Column({ type: 'char', length: 1, nullable: false })
  state: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  create_time: Timestamp;

  @Column({ type: 'char', length: 1 })
  status: string;

  @ManyToOne(() => Tribe, (tribe) => tribe.repository, {
    onDelete: 'CASCADE',
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'id_tribe' })
  tribe: Tribe[];
}
