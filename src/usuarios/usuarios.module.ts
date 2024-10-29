import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { MailModule } from '../mail/mail.module';
import { TablasModule } from '../tablas/tablas.module';
import { ModulosModule } from '../modulos/modulos.module';
import { Perfile } from 'src/perfiles/entities/perfile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Perfile]), MailModule,
    TablasModule, ModulosModule
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService]
})
export class UsuariosModule { }
