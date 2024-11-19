import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { MailModule } from '../mail/mail.module';
import { TablasModule } from '../tablas/tablas.module';
import { ModulosModule } from '../modulos/modulos.module';
import { Perfile } from 'src/perfiles/entities/perfile.entity';
import { DetallePermisosModule } from 'src/detalle_permisos/detalle_permisos.module';
import { Sesione } from 'src/sesiones/entities/sesione.entity';
import { Empresa } from 'src/empresas/entities/empresa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Perfile, Sesione, Empresa]), MailModule,
    TablasModule, ModulosModule, DetallePermisosModule
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService]
})
export class UsuariosModule { }
