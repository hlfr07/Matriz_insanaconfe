import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { JwtModule } from '@nestjs/jwt';
import { ModulosModule } from '../modulos/modulos.module';
import { TablasModule } from '../tablas/tablas.module';
import { DetallePermisosModule } from 'src/detalle_permisos/detalle_permisos.module';
import { SesionesModule } from 'src/sesiones/sesiones.module';

@Module({
  imports: [DetallePermisosModule,TablasModule ,ModulosModule,UsuariosModule, SesionesModule, JwtModule.register({
    global: true,
  })],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
