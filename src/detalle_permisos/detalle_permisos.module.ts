import { forwardRef, Module } from '@nestjs/common';
import { DetallePermisosService } from './detalle_permisos.service';
import { DetallePermisosController } from './detalle_permisos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetallePermiso } from './entities/detalle_permiso.entity';
import { ModulosModule } from 'src/modulos/modulos.module';
import { TablasModule } from 'src/tablas/tablas.module';
import { PerfilesModule } from 'src/perfiles/perfiles.module';
import { Modulo } from 'src/modulos/entities/modulo.entity';
import { Tabla } from 'src/tablas/entities/tabla.entity';
import { Perfile } from 'src/perfiles/entities/perfile.entity';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  imports: [TypeOrmModule.forFeature([DetallePermiso, Modulo, Tabla, Perfile]), forwardRef(() => PerfilesModule), forwardRef(() => UsuariosModule)],
  controllers: [DetallePermisosController],
  providers: [DetallePermisosService],
  exports: [DetallePermisosService]
})
export class DetallePermisosModule { }
