import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTipoEspacioDto {
  @ApiProperty({
    description: 'Nombre del tipo de espacio',
    example: 'Sala de Reuniones',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre: string;

  @ApiProperty({
    description: 'Descripción del tipo de espacio',
    example: 'Espacios para reuniones corporativas',
    required: false,
  })
  @IsString()
  @IsOptional()
  descripcion?: string;
}