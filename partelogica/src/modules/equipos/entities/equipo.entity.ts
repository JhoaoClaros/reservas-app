import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Espacio } from '../../espacios/entities/espacio.entity';

@Entity('equipos')
export class Equipo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ name: 'espacio_id' })
  espacioId: number;

  @ManyToOne(() => Espacio, (espacio) => espacio.equipos)
  @JoinColumn({ name: 'espacio_id' })
  espacio: Espacio;

  @Column({ type: 'int', default: 1 })
  cantidad: number;

  @Column({ default: true })
  funcional: boolean;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}