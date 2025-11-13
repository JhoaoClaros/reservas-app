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
import { EquiposService } from './equipos.service';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipos.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolEnum } from '../../common/enums/rol.enum';

@ApiTags('Equipos')
@ApiBearerAuth()
@Controller('equipos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EquiposController {
  constructor(private readonly equiposService: EquiposService) {}

  @Post()
  @Roles(RolEnum.ADMIN, RolEnum.SUPERVISOR)
  @ApiOperation({ summary: 'Crear un nuevo equipo (admin/supervisor)' })
  create(@Body() createEquipoDto: CreateEquipoDto) {
    return this.equiposService.create(createEquipoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los equipos' })
  findAll() {
    return this.equiposService.findAll();
  }

  @Get('espacio/:espacioId')
  @ApiOperation({ summary: 'Obtener equipos por espacio' })
  findByEspacio(@Param('espacioId', ParseIntPipe) espacioId: number) {
    return this.equiposService.findByEspacio(espacioId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un equipo por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.equiposService.findOne(id);
  }

  @Patch(':id')
  @Roles(RolEnum.ADMIN, RolEnum.SUPERVISOR)
  @ApiOperation({ summary: 'Actualizar un equipo (admin/supervisor)' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEquipoDto: UpdateEquipoDto,
  ) {
    return this.equiposService.update(id, updateEquipoDto);
  }

  @Patch(':id/toggle-funcional')
  @Roles(RolEnum.ADMIN, RolEnum.SUPERVISOR)
  @ApiOperation({ summary: 'Cambiar estado funcional de equipo (admin/supervisor)' })
  toggleFuncional(@Param('id', ParseIntPipe) id: number) {
    return this.equiposService.toggleFuncional(id);
  }

  @Delete(':id')
  @Roles(RolEnum.ADMIN)
  @ApiOperation({ summary: 'Eliminar un equipo (solo admin)' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.equiposService.remove(id);
  }
}