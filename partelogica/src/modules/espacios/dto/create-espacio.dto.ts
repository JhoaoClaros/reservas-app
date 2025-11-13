import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsPositive,
  IsOptional,
  MaxLength,
  IsBoolean,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEspacioDto {
  @ApiProperty({
    description: 'Nombre del espacio',
    example: 'Sala Ejecutiva A-101',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre: string;

  @ApiProperty({
    description: 'Capacidad máxima de personas',
    example: 10,
    minimum: 1,
  })
  @IsInt()
  @IsPositive()
  @Min(1)
  capacidad: number;

  @ApiProperty({
    description: 'ID del tipo de espacio',
    example: 1,
  })
  @IsInt()
  @IsPositive()
  tipoId: number;

  @ApiProperty({
    description: 'Ubicación física del espacio',
    example: 'Edificio A - Piso 1',
    maxLength: 200,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  ubicacion?: string;

  @ApiProperty({
    description: 'Descripción del espacio',
    example: 'Sala equipada con proyector y pizarra digital',
    required: false,
  })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty({
    description: 'Estado de disponibilidad',
    example: true,
    default: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  disponible?: boolean;
}