import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EspaciosService } from './espacios.service';
import { EspaciosController } from './espacios.controller';
import { Espacio } from './entities/espacio.entity';
import { TiposEspacioModule } from '../tipos-espacio/tipos-espacio.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Espacio]),
    TiposEspacioModule,
  ],
  controllers: [EspaciosController],
  providers: [EspaciosService],
  exports: [EspaciosService],
})
export class EspaciosModule {}