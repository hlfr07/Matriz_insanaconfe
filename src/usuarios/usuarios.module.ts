import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { MailModule } from '../mail/mail.module';
import { TablasModule } from '../tablas/tablas.module';
import { ModulosModule } from '../modulos/modulos.module';
import { DetalleModulosTablasModule } from '../detalle_modulos_tablas/detalle_modulos_tablas.module';
import { DetalleModuloPerfilModule } from '../detalle_modulo_perfil/detalle_modulo_perfil.module';
import { DetallePerfilesModule } from '../detalle_perfiles/detalle_perfiles.module';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]), MailModule,
    TablasModule, ModulosModule, DetalleModulosTablasModule, DetalleModuloPerfilModule, DetallePerfilesModule,
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService]
})
export class UsuariosModule { }
