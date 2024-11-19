import { forwardRef, Module } from '@nestjs/common';
import { MatricesService } from './matrices.service';
import { MatricesController } from './matrices.controller';
import { Matrix } from './entities/matrix.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Empresa } from 'src/empresas/entities/empresa.entity';
import { PerfilesModule } from 'src/perfiles/perfiles.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  imports: [TypeOrmModule.forFeature([Matrix, Empresa]), forwardRef(() => PerfilesModule), forwardRef(() => UsuariosModule)],
  controllers: [MatricesController],
  providers: [MatricesService],
  exports: [MatricesService]
})
export class MatricesModule { }
