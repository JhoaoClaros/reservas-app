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
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TiposEspacioService } from './tipos-espacio.service';
import { CreateTipoEspacioDto } from './dto/create-tipo-espacio.dto';
import { UpdateTipoEspacioDto } from './dto/update-tipo-espacio.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolEnum } from '../../common/enums/rol.enum';

@ApiTags('Tipos de Espacio')
@ApiBearerAuth()
@Controller('tipos-espacio')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TiposEspacioController {
  constructor(private readonly tiposEspacioService: TiposEspacioService) {}

  @Post()
  @Roles(RolEnum.ADMIN)
  @ApiOperation({ summary: 'Crear un nuevo tipo de espacio (solo admin)' })
  create(@Body() createTipoEspacioDto: CreateTipoEspacioDto) {
    return this.tiposEspacioService.create(createTipoEspacioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los tipos de espacio' })
  findAll() {
    return this.tiposEspacioService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un tipo de espacio por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tiposEspacioService.findOne(id);
  }

  @Patch(':id')
  @Roles(RolEnum.ADMIN)
  @ApiOperation({ summary: 'Actualizar un tipo de espacio (solo admin)' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTipoEspacioDto: UpdateTipoEspacioDto,
  ) {
    return this.tiposEspacioService.update(id, updateTipoEspacioDto);
  }

  @Delete(':id')
  @Roles(RolEnum.ADMIN)
  @ApiOperation({ summary: 'Eliminar un tipo de espacio (solo admin)' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tiposEspacioService.remove(id);
  }
}