import { forwardRef, Module } from '@nestjs/common';
import { MatrizValoresService } from './matriz_valores.service';
import { MatrizValoresController } from './matriz_valores.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatrizValore } from './entities/matriz_valore.entity';
import { Matrix } from 'src/matrices/entities/matrix.entity';
import { PerfilesModule } from 'src/perfiles/perfiles.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  imports: [TypeOrmModule.forFeature([MatrizValore, Matrix]),forwardRef(() => PerfilesModule), forwardRef(() => UsuariosModule)],
  controllers: [MatrizValoresController],
  providers: [MatrizValoresService],
  exports: [MatrizValoresService]
})
export class MatrizValoresModule { }
