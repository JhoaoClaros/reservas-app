import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from './entities/rol.entity';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

  async create(createRolDto: CreateRolDto): Promise<Rol> {
    // Verificar si el rol ya existe
    const existingRol = await this.rolRepository.findOne({
      where: { nombre: createRolDto.nombre },
    });

    if (existingRol) {
      throw new ConflictException(
        `El rol '${createRolDto.nombre}' ya existe`,
      );
    }

    const rol = this.rolRepository.create(createRolDto);
    return await this.rolRepository.save(rol);
  }

  async findAll(): Promise<Rol[]> {
    return await this.rolRepository.find({
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Rol> {
    const rol = await this.rolRepository.findOne({ where: { id } });

    if (!rol) {
      throw new NotFoundException(`Rol con ID ${id} no encontrado`);
    }

    return rol;
  }

  async findByNombre(nombre: string): Promise<Rol> {
    const rol = await this.rolRepository.findOne({ where: { nombre } });

    if (!rol) {
      throw new NotFoundException(`Rol '${nombre}' no encontrado`);
    }

    return rol;
  }

  async update(id: number, updateRolDto: UpdateRolDto): Promise<Rol> {
    const rol = await this.findOne(id);

    // Si se está actualizando el nombre, verificar que no exista
    if (updateRolDto.nombre && updateRolDto.nombre !== rol.nombre) {
      const existingRol = await this.rolRepository.findOne({
        where: { nombre: updateRolDto.nombre },
      });

      if (existingRol) {
        throw new ConflictException(
          `El rol '${updateRolDto.nombre}' ya existe`,
        );
      }
    }

    Object.assign(rol, updateRolDto);
    return await this.rolRepository.save(rol);
  }

  async remove(id: number): Promise<void> {
    const rol = await this.findOne(id);
    await this.rolRepository.remove(rol);
  }
}