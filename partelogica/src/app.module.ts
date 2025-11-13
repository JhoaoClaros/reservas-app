import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './modules/roles/roles.module';
import { UsuariosModule } from './modules/usuario/usuarios.module';
import { TiposEspacioModule } from './modules/tipos-espacio/tipos-espacio.module';
import { EspaciosModule } from './modules/espacios/espacios.module';
import { EquiposModule } from './modules/equipos/equipos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_DATABASE || 'sresbd',
      autoLoadEntities: true,
      synchronize: true, 
    }),
    AuthModule,
    RolesModule,
    UsuariosModule,
    TiposEspacioModule,
    EspaciosModule,
    EquiposModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}