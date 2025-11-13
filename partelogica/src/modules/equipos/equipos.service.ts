import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipo } from './entities/equipo.entity';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipos.dto';
import { EspaciosService } from '../espacios/espacios.service';

@Injectable()
export class EquiposService {
  constructor(
    @InjectRepository(Equipo)
    private readonly equipoRepository: Repository<Equipo>,
    private readonly espaciosService: EspaciosService,
  ) {}

  async create(createEquipoDto: CreateEquipoDto): Promise<Equipo> {
    // Verificar que el espacio existe
    await this.espaciosService.findOne(createEquipoDto.espacioId);

    const equipo = this.equipoRepository.create(createEquipoDto);
    return await this.equipoRepository.save(equipo);
  }

  async findAll(): Promise<Equipo[]> {
    return await this.equipoRepository.find({
      relations: ['espacio'],
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Equipo> {
    const equipo = await this.equipoRepository.findOne({
      where: { id },
      relations: ['espacio'],
    });

    if (!equipo) {
      throw new NotFoundException(`Equipo con ID ${id} no encontrado`);
    }

    return equipo;
  }

  async findByEspacio(espacioId: number): Promise<Equipo[]> {
    return await this.equipoRepository.find({
      where: { espacioId },
      relations: ['espacio'],
      order: { nombre: 'ASC' },
    });
  }

  async update(id: number, updateEquipoDto: UpdateEquipoDto): Promise<Equipo> {
    const equipo = await this.findOne(id);

    // Si se actualiza el espacio, verificar que existe
    if (updateEquipoDto.espacioId) {
      await this.espaciosService.findOne(updateEquipoDto.espacioId);
    }

    Object.assign(equipo, updateEquipoDto);
    return await this.equipoRepository.save(equipo);
  }

  async toggleFuncional(id: number): Promise<Equipo> {
    const equipo = await this.findOne(id);
    equipo.funcional = !equipo.funcional;
    return await this.equipoRepository.save(equipo);
  }

  async remove(id: number): Promise<void> {
    const equipo = await this.findOne(id);
    await this.equipoRepository.remove(equipo);
  }
}