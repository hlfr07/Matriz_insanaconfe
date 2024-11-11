import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/login-auth.dto';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs'
import { ModulosService } from '../modulos/modulos.service';
import { TablasService } from '../tablas/tablas.service';
import { DetallePermisosService } from 'src/detalle_permisos/detalle_permisos.service';
import { SesionesService } from 'src/sesiones/sesiones.service';
import e from 'express';

@Injectable()
export class AuthService {
  //creamos el constructor para usar el servicio de usuario
  constructor(private readonly usuarioService: UsuariosService,
    private readonly jwtService: JwtService, private readonly modulos: ModulosService, private readonly tablas: TablasService, private readonly detallePermisos: DetallePermisosService, private readonly sesiones: SesionesService) { }
  async create(createAuthDto: CreateAuthDto) {
    //buscamos el usuario por el nombre
    const usuario = await this.usuarioService.buscarParaLogin(createAuthDto.usuario);

    if (!usuario) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const passwordValido = await bcryptjs.compare(createAuthDto.password, usuario.password);

    if (!passwordValido) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    //buscamos si el usuario tiene una sesion activa
    const sesionActiva = await this.sesiones.buscarSesionesPorUsuario(usuario.id);

    //verificamos si hay datos en la sesion
    if (sesionActiva) {
      //si hay datos en la sesion, actualizamos la sesion
      throw new UnauthorizedException('Ya hay una sesion activa');
    } else {
      //si no hay datos en la sesion, creamos una nueva sesion
      await this.sesiones.activarSesionesPorUsuario(usuario.id);
    }

    // console.log("SESION ACTIVA", sesionActiva);

    //buscamos los perfiles que le corresponde a cada usuario

    // console.log("USUARIO", usuario.perfil);
    const perfilUsuario = usuario.perfil;

    //recorremos con un foreach al detallePerfiles para extraer el permisos usando el servicio de permisos
    const permisos = await this.detallePermisos.buscarPermisosperfil(perfilUsuario);

    //console.log(permisos);

    const payload = {
      sub: usuario.id,
      usuario: {
        id: usuario.id,
        usuario: usuario.usuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email
      },
      perfiles: permisos.perfiles,
      modulos: permisos.modulos,
      tablas: permisos.tablas
    };
    // console.log("PERMISOS DE MI USUARIO", payload);
    // console.log(payload.tablas);

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.ACCESS_TOKEN,
      expiresIn: 60 * 60, // 1 hora
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN,
      expiresIn: 60 * 60 * 24 * 30, // 30 días
    });

    return {
      token: accessToken,
      refreshToken: refreshToken,
    };
  }
}
