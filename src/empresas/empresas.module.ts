import { forwardRef, Module } from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { EmpresasController } from './empresas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa } from './entities/empresa.entity';
import { PerfilesModule } from 'src/perfiles/perfiles.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  imports: [TypeOrmModule.forFeature([Empresa]), forwardRef(() => PerfilesModule), forwardRef(() => UsuariosModule)],
  controllers: [EmpresasController],
  providers: [EmpresasService],
  exports: [EmpresasService],
})
export class EmpresasModule {}
