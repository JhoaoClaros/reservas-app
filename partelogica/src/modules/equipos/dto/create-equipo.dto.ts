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

export class CreateEquipoDto {
  @ApiProperty({
    description: 'Nombre del equipo',
    example: 'Proyector HD',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre: string;

  @ApiProperty({
    description: 'ID del espacio al que pertenece',
    example: 1,
  })
  @IsInt()
  @IsPositive()
  espacioId: number;

  @ApiProperty({
    description: 'Cantidad de equipos',
    example: 1,
    minimum: 0,
    default: 1,
    required: false,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  cantidad?: number;

  @ApiProperty({
    description: 'Estado funcional del equipo',
    example: true,
    default: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  funcional?: boolean;

  @ApiProperty({
    description: 'Descripción del equipo',
    example: 'Proyector 1080p con HDMI',
    required: false,
  })
  @IsString()
  @IsOptional()
  descripcion?: string;
}