import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { TipoEspacio } from '../../tipos-espacio/entities/tipo-espacio.entity';
import { Equipo } from '../../equipos/entities/equipo.entity';

@Entity('espacios')
export class Espacio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ type: 'int' })
  capacidad: number;

  @Column({ name: 'tipo_id' })
  tipoId: number;

  @ManyToOne(() => TipoEspacio, (tipo) => tipo.espacios, { eager: true })
  @JoinColumn({ name: 'tipo_id' })
  tipo: TipoEspacio;

  @Column({ length: 200, nullable: true })
  ubicacion: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ default: true })
  disponible: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Equipo, (equipo) => equipo.espacio)
  equipos: Equipo[];
}