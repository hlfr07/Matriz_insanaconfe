import { Module } from '@nestjs/common';
import { MatrizValoresService } from './matriz_valores.service';
import { MatrizValoresController } from './matriz_valores.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatrizValore } from './entities/matriz_valore.entity';
import { Matrix } from 'src/matrices/entities/matrix.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MatrizValore, Matrix])],
  controllers: [MatrizValoresController],
  providers: [MatrizValoresService],
  exports: [MatrizValoresService]
})
export class MatrizValoresModule { }
