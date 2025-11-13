import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Espacio } from './entities/espacio.entity';
import { CreateEspacioDto } from './dto/create-espacio.dto';
import { UpdateEspacioDto } from './dto/update-espacio.dto';
import { TiposEspacioService } from '../tipos-espacio/tipos-espacio.service';

@Injectable()
export class EspaciosService {
  constructor(
    @InjectRepository(Espacio)
    private readonly espacioRepository: Repository<Espacio>,
    private readonly tiposEspacioService: TiposEspacioService,
  ) {}

  async create(createEspacioDto: CreateEspacioDto): Promise<Espacio> {
    // Verificar que el tipo de espacio existe
    await this.tiposEspacioService.findOne(createEspacioDto.tipoId);

    const espacio = this.espacioRepository.create(createEspacioDto);
    return await this.espacioRepository.save(espacio);
  }

  async findAll(): Promise<Espacio[]> {
    return await this.espacioRepository.find({
      relations: ['tipo', 'equipos'],
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Espacio> {
    const espacio = await this.espacioRepository.findOne({
      where: { id },
      relations: ['tipo', 'equipos'],
    });

    if (!espacio) {
      throw new NotFoundException(`Espacio con ID ${id} no encontrado`);
    }

    return espacio;
  }

  async findByTipo(tipoId: number): Promise<Espacio[]> {
    return await this.espacioRepository.find({
      where: { tipoId },
      relations: ['tipo', 'equipos'],
      order: { nombre: 'ASC' },
    });
  }

  async findDisponibles(): Promise<Espacio[]> {
    return await this.espacioRepository.find({
      where: { disponible: true },
      relations: ['tipo', 'equipos'],
      order: { nombre: 'ASC' },
    });
  }

  async update(id: number, updateEspacioDto: UpdateEspacioDto): Promise<Espacio> {
    const espacio = await this.findOne(id);

    // Si se actualiza el tipo, verificar que existe
    if (updateEspacioDto.tipoId) {
      await this.tiposEspacioService.findOne(updateEspacioDto.tipoId);
    }

    Object.assign(espacio, updateEspacioDto);
    return await this.espacioRepository.save(espacio);
  }

  async toggleDisponibilidad(id: number): Promise<Espacio> {
    const espacio = await this.findOne(id);
    espacio.disponible = !espacio.disponible;
    return await this.espacioRepository.save(espacio);
  }

  async remove(id: number): Promise<void> {
    const espacio = await this.findOne(id);
    await this.espacioRepository.remove(espacio);
  }
}