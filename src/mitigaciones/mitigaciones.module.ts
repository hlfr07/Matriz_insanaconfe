import { Module } from '@nestjs/common';
import { MitigacionesService } from './mitigaciones.service';
import { MitigacionesController } from './mitigaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mitigacione } from './entities/mitigacione.entity';
import { Evento } from 'src/eventos/entities/evento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mitigacione, Evento])],
  controllers: [MitigacionesController],
  providers: [MitigacionesService],
  exports: [MitigacionesService]
})
export class MitigacionesModule {}
