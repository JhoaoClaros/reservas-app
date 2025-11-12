import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuariosService } from '../modules/usuario/usuarios.service';
import { RolesService } from '../modules/roles/roles.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RolEnum } from '../common/enums/rol.enum';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private rolesService: RolesService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // Verificar si el email ya existe
    try {
      await this.usuariosService.findByEmail(registerDto.email);
      throw new ConflictException('El email ya está registrado');
    } catch (error) {
      if (error instanceof ConflictException) throw error;
      // Si no existe, continuar con el registro
    }

    // Obtener rol "user" por defecto
    const rolUser = await this.rolesService.findByNombre(RolEnum.USER);

    // Crear usuario con rol "user"
    const usuario = await this.usuariosService.create({
      ...registerDto,
      rolId: rolUser.id,
      activo: true,
    });

    // Generar token
    const payload = {
      sub: usuario.id,
      email: usuario.email,
      rol: usuario.rol.nombre,
    };

    return {
      access_token: this.jwtService.sign(payload),
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol.nombre,
      },
    };
  }

  async login(loginDto: LoginDto) {
    // Buscar usuario por email
    const usuario = await this.usuariosService.findByEmail(loginDto.email);

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      usuario.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // Verificar que esté activo
    if (!usuario.activo) {
      throw new UnauthorizedException('Usuario inactivo');
    }

    // Generar token
    const payload = {
      sub: usuario.id,
      email: usuario.email,
      rol: usuario.rol.nombre,
    };

    return {
      access_token: this.jwtService.sign(payload),
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol.nombre,
      },
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const usuario = await this.usuariosService.findByEmail(email);
      const isPasswordValid = await bcrypt.compare(password, usuario.password);

      if (isPasswordValid && usuario.activo) {
        const { password, ...result } = usuario;
        return result;
      }
    } catch (error) {
      return null;
    }
    return null;
  }
}