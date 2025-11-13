import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { EspaciosService } from './espacios.service';
import { CreateEspacioDto } from './dto/create-espacio.dto';
import { UpdateEspacioDto } from './dto/update-espacio.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolEnum } from '../../common/enums/rol.enum';

@ApiTags('Espacios')
@ApiBearerAuth()
@Controller('espacios')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EspaciosController {
  constructor(private readonly espaciosService: EspaciosService) {}

  @Post()
  @Roles(RolEnum.ADMIN, RolEnum.SUPERVISOR)
  @ApiOperation({ summary: 'Crear un nuevo espacio (admin/supervisor)' })
  create(@Body() createEspacioDto: CreateEspacioDto) {
    return this.espaciosService.create(createEspacioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los espacios' })
  @ApiQuery({ name: 'disponible', required: false, type: Boolean })
  findAll(@Query('disponible') disponible?: string) {
    if (disponible === 'true') {
      return this.espaciosService.findDisponibles();
    }
    return this.espaciosService.findAll();
  }

  @Get('tipo/:tipoId')
  @ApiOperation({ summary: 'Obtener espacios por tipo' })
  findByTipo(@Param('tipoId', ParseIntPipe) tipoId: number) {
    return this.espaciosService.findByTipo(tipoId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un espacio por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.espaciosService.findOne(id);
  }

  @Patch(':id')
  @Roles(RolEnum.ADMIN, RolEnum.SUPERVISOR)
  @ApiOperation({ summary: 'Actualizar un espacio (admin/supervisor)' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEspacioDto: UpdateEspacioDto,
  ) {
    return this.espaciosService.update(id, updateEspacioDto);
  }

  @Patch(':id/toggle-disponibilidad')
  @Roles(RolEnum.ADMIN, RolEnum.SUPERVISOR)
  @ApiOperation({ summary: 'Cambiar disponibilidad de espacio (admin/supervisor)' })
  toggleDisponibilidad(@Param('id', ParseIntPipe) id: number) {
    return this.espaciosService.toggleDisponibilidad(id);
  }

  @Delete(':id')
  @Roles(RolEnum.ADMIN)
  @ApiOperation({ summary: 'Eliminar un espacio (solo admin)' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.espaciosService.remove(id);
  }
}