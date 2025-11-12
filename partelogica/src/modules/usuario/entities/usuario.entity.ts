import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Rol } from '../../roles/entities/rol.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ unique: true, length: 100 })
  email: string;

  @Column({ length: 255 })
  @Exclude() // No exponer el password en las respuestas
  password: string;

  @Column({ name: 'rol_id' })
  rolId: number;

  @ManyToOne(() => Rol, (rol) => rol.usuarios, { eager: true })
  @JoinColumn({ name: 'rol_id' })
  rol: Rol;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}