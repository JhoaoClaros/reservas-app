import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiposEspacioService } from './tipos-espacio.service';
import { TiposEspacioController } from './tipos-espacio.controller';
import { TipoEspacio } from './entities/tipo-espacio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoEspacio])],
  controllers: [TiposEspacioController],
  providers: [TiposEspacioService],
  exports: [TiposEspacioService],
})
export class TiposEspacioModule {}