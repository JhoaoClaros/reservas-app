import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsuariosService } from '../../modules/usuario/usuarios.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usuariosService: UsuariosService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'default-secret-key',
    });
  }

  async validate(payload: any) {
    // payload contiene: { sub: userId, email, rol }
    const usuario = await this.usuariosService.findOne(payload.sub);

    if (!usuario || !usuario.activo) {
      throw new UnauthorizedException('Usuario no autorizado');
    }

    // Esto se agrega a request.user
    return {
      userId: usuario.id,
      email: usuario.email,
      rol: usuario.rol.nombre,
    };
  }
}