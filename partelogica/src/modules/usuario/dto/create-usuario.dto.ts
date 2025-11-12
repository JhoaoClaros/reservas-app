import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsInt,
  IsPositive,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @ApiProperty({
    description: 'Nombre completo del usuario',
    example: 'Juan Pérez',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre: string;

  @ApiProperty({
    description: 'Email del usuario',
    example: 'juan@correo.com',
    maxLength: 100,
  })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100)
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario (mínimo 6 caracteres)',
    example: 'password123',
    minLength: 6,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'ID del rol asignado',
    example: 2,
  })
  @IsInt()
  @IsPositive()
  rolId: number;

  @ApiProperty({
    description: 'Estado activo del usuario',
    example: true,
    default: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}