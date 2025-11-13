import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoEspacio } from './entities/tipo-espacio.entity';
import { CreateTipoEspacioDto } from './dto/create-tipo-espacio.dto';
import { UpdateTipoEspacioDto } from './dto/update-tipo-espacio.dto';

@Injectable()
export class TiposEspacioService {
  constructor(
    @InjectRepository(TipoEspacio)
    private readonly tipoEspacioRepository: Repository<TipoEspacio>,
  ) {}

  async create(createTipoEspacioDto: CreateTipoEspacioDto): Promise<TipoEspacio> {
    const existingTipo = await this.tipoEspacioRepository.findOne({
      where: { nombre: createTipoEspacioDto.nombre },
    });

    if (existingTipo) {
      throw new ConflictException(
        `El tipo de espacio '${createTipoEspacioDto.nombre}' ya existe`,
      );
    }

    const tipoEspacio = this.tipoEspacioRepository.create(createTipoEspacioDto);
    return await this.tipoEspacioRepository.save(tipoEspacio);
  }

  async findAll(): Promise<TipoEspacio[]> {
    return await this.tipoEspacioRepository.find({
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<TipoEspacio> {
    const tipoEspacio = await this.tipoEspacioRepository.findOne({
      where: { id },
    });

    if (!tipoEspacio) {
      throw new NotFoundException(`Tipo de espacio con ID ${id} no encontrado`);
    }

    return tipoEspacio;
  }

  async update(
    id: number,
    updateTipoEspacioDto: UpdateTipoEspacioDto,
  ): Promise<TipoEspacio> {
    const tipoEspacio = await this.findOne(id);

    if (updateTipoEspacioDto.nombre && updateTipoEspacioDto.nombre !== tipoEspacio.nombre) {
      const existingTipo = await this.tipoEspacioRepository.findOne({
        where: { nombre: updateTipoEspacioDto.nombre },
      });

      if (existingTipo) {
        throw new ConflictException(
          `El tipo de espacio '${updateTipoEspacioDto.nombre}' ya existe`,
        );
      }
    }

    Object.assign(tipoEspacio, updateTipoEspacioDto);
    return await this.tipoEspacioRepository.save(tipoEspacio);
  }

  async remove(id: number): Promise<void> {
    const tipoEspacio = await this.findOne(id);
    await this.tipoEspacioRepository.remove(tipoEspacio);
  }
}