import { Module } from '@nestjs/common';
import { RiesgosService } from './riesgos.service';
import { RiesgosController } from './riesgos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Riesgo } from './entities/riesgo.entity';
import { Matrix } from 'src/matrices/entities/matrix.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Riesgo, Matrix])],
  controllers: [RiesgosController],
  providers: [RiesgosService],
  exports: [RiesgosService]
})
export class RiesgosModule {}
