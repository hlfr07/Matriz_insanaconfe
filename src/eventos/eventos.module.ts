import { forwardRef, Module } from '@nestjs/common';
import { EventosService } from './eventos.service';
import { EventosController } from './eventos.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evento } from './entities/evento.entity';
import { Matrix } from 'src/matrices/entities/matrix.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { PerfilesModule } from 'src/perfiles/perfiles.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  imports: [TypeOrmModule.forFeature([Evento, Matrix, Usuario]), forwardRef(() => PerfilesModule), forwardRef(() => UsuariosModule)],
  controllers: [EventosController],
  providers: [EventosService],
  exports: [EventosService]
})
export class EventosModule { }
