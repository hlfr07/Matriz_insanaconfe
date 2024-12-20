import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import { UpdatePasswordUsuarioDto } from './dto/updatepassword-usuario.dto';
import { MailService } from '../mail/mail.service';
import { UpdatePasswordCodeUsuarioDto } from './dto/updatepasswordcode-usuarios.dto';
import { ModulosService } from '../modulos/modulos.service';
import { TablasService } from '../tablas/tablas.service';
import { Perfile } from 'src/perfiles/entities/perfile.entity';
import { DetallePermisosService } from 'src/detalle_permisos/detalle_permisos.service';
import { Sesione } from 'src/sesiones/entities/sesione.entity';
import { Empresa } from 'src/empresas/entities/empresa.entity';

@Injectable()
export class UsuariosService {
  constructor(@InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>, private readonly mailService: MailService, @InjectRepository(Perfile) private perfileRepository: Repository<Perfile>, private readonly detallePermisos: DetallePermisosService, @InjectRepository(Sesione) private sesionRepository: Repository<Sesione>, @InjectRepository(Empresa) private empresaRepository: Repository<Empresa>) { }
  async create(createUsuarioDto: CreateUsuarioDto) {
    const dniEncontrado = await this.usuarioRepository.findOneBy({
      dni: createUsuarioDto.dni
    });

    const usuarioEncontrado = await this.usuarioRepository.findOneBy({
      usuario: createUsuarioDto.usuario
    });

    const emailEncontrado = await this.usuarioRepository.findOneBy({
      email: createUsuarioDto.email
    });

    //buscamos si el id_perfil existe
    const perfilEncontrado = await this.perfileRepository.findOneBy({
      id: parseInt(createUsuarioDto.id_perfil)
    });

    if (!perfilEncontrado) {
      throw new HttpException('Perfil no encontrado', HttpStatus.NOT_FOUND);
    }

    if (dniEncontrado) {
      throw new HttpException('El dni ya existe', HttpStatus.BAD_REQUEST);
    }

    if (emailEncontrado) {
      throw new HttpException('El email ya existe', HttpStatus.BAD_REQUEST);
    }

    if (usuarioEncontrado) {
      throw new HttpException('El usuario ya existe', HttpStatus.BAD_REQUEST);
    }

    //buscamos la empresa por el id 
    const empresaEncontrada = await this.empresaRepository.findOneBy({
      id: parseInt(createUsuarioDto.id_empresa)
    });

    if (!empresaEncontrada) {
      throw new HttpException('Empresa no encontrada', HttpStatus.NOT_FOUND);
    }

    //ahora pasamos a crear el usuario pero con el password encriptado
    const nuevoUsuario = this.usuarioRepository.create({
      dni: createUsuarioDto.dni,
      nombre: createUsuarioDto.nombre,
      apellido: createUsuarioDto.apellido,
      email: createUsuarioDto.email,
      usuario: createUsuarioDto.usuario,
      password: await bcryptjs.hash(createUsuarioDto.password, 10),
      perfil: perfilEncontrado,
      empresa: empresaEncontrada
    });

    await this.usuarioRepository.save(nuevoUsuario);

    //ahora creamos una sesion para el usuario con estado false
    const now = new Date();
    const horaLocal = now.toLocaleTimeString('en-PE', { hour12: false }); // Formato de 24 horas en Perú

    const nuevaSesion = this.sesionRepository.create({
      fecha: now,
      hora: horaLocal,
      usuario: nuevoUsuario,
      estado: false
    });


    await this.sesionRepository.save(nuevaSesion);

    return nuevoUsuario;
  }

  findAll() {
    const usuarios = this.usuarioRepository.find({
      order: { id: 'DESC' }
    });

    return usuarios;
  }

  async findOne(id: number) {
    const usuario = await this.usuarioRepository.findOneBy({
      id: id
    });

    if (!usuario) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    if (!usuario.estado) {
      throw new HttpException('Usuario eliminado', HttpStatus.BAD_REQUEST);
    }

    return usuario;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuarioEncontrado = await this.usuarioRepository.findOneBy({
      id: id,
    });

    if (!usuarioEncontrado) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    //verificamos que el id_perfil exista
    const perfilEncontrado = await this.perfileRepository.findOneBy({
      id: parseInt(updateUsuarioDto.id_perfil)
    });

    if (!perfilEncontrado) {
      throw new HttpException('Perfil no encontrado', HttpStatus.NOT_FOUND);
    }

    //empresa encontrada
    const empresaEncontrada = await this.empresaRepository.findOneBy({
      id: parseInt(updateUsuarioDto.id_empresa)
    });

    if (!empresaEncontrada) {
      throw new HttpException('Empresa no encontrada', HttpStatus.NOT_FOUND);
    }

    //comprobar la existencia del dni, usuario, email con el mismo nombre solo si el nombre es diferente
    if (updateUsuarioDto.dni !== usuarioEncontrado.dni) {
      const dniEncontrado = await this.usuarioRepository.findOneBy({
        dni: updateUsuarioDto.dni
      });

      if (dniEncontrado) {
        throw new HttpException('El dni ya existe', HttpStatus.BAD_REQUEST);
      }
    }

    if (updateUsuarioDto.email !== usuarioEncontrado.email) {
      const emailEncontrado = await this.usuarioRepository.findOneBy({
        email: updateUsuarioDto.email
      });

      if (emailEncontrado) {
        throw new HttpException('El email ya existe', HttpStatus.BAD_REQUEST);
      }
    }

    if (updateUsuarioDto.usuario !== usuarioEncontrado.usuario) {
      const usuarioEncontrado = await this.usuarioRepository.findOneBy({
        usuario: updateUsuarioDto.usuario
      });

      if (usuarioEncontrado) {
        throw new HttpException('El usuario ya existe', HttpStatus.BAD_REQUEST);
      }
    }

    await this.usuarioRepository.update(id, {
      dni: updateUsuarioDto.dni,
      nombre: updateUsuarioDto.nombre,
      apellido: updateUsuarioDto.apellido,
      email: updateUsuarioDto.email,
      usuario: updateUsuarioDto.usuario,
      password: usuarioEncontrado.password,
      perfil: perfilEncontrado,
      empresa: empresaEncontrada
    });

    return { message: 'Usuario actualizado correctamente' };
  }

  //creamos el servicio para actualizar la contraseña
  async updatePassword(UpdatePasswordUsuarioDto: UpdatePasswordUsuarioDto) {
    //buscamos el usuario por el email
    const usuarioEncontrado = await this.usuarioRepository.findOneBy({
      email: UpdatePasswordUsuarioDto.email,
      estado: true
    });

    if (!usuarioEncontrado) {
      return { message: 'Usuario no encontrado' };
    }

    if (!usuarioEncontrado.estado) {
      return { message: 'Usuario no encontrado' };
    }

    //generamos un codigo de  verificacion de 6 digitos
    const codigoVerificacion = Math.floor(100000 + Math.random() * 900000);

    // Establecer la expiración del código (por ejemplo, 5 minutos)
    const expiracion = new Date();
    expiracion.setMinutes(expiracion.getMinutes() + 5);

    //actualizamos el usuario con el codigo de verificacion y la expiracion
    await this.usuarioRepository.update(usuarioEncontrado.id, {
      resetCode: codigoVerificacion.toString(),
      resetCodeExpiration: expiracion
    });

    //ahpra vamos a mejorar la fecha y hora para enviar por correo: de esto Sat Sep 14 2024 17:36:38 a esto 14/09/2024 17:36:38, en una const expiracionformat
    const expiracionFormat = expiracion.getDate() + '/' + (expiracion.getMonth() + 1) + '/' + expiracion.getFullYear() + ' ' + expiracion.getHours() + ':' + expiracion.getMinutes() + ':' + expiracion.getSeconds();

    //ahora enviamos el dni que corresponde al usaurio y un codigo de verificacion al correo del usuario usando mail service y en el conten haremos una vusta bonita
    const emailContent = `
                        <html>
                        <head>
                        <style>
                        body {
                          font-family: Arial, sans-serif;
                          background-color: #f4f4f4;
                          color: #333;
                          padding: 20px;
                        }
                        .container {
                          background-color: #fff;
                          padding: 20px;
                          border-radius: 5px;
                          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                          background-color: #4CAF50;
                          color: white;
                          padding: 10px;
                          text-align: center;
                          border-radius: 5px 5px 0 0;
                        }
                        .content {
                          margin-top: 20px;
                        }
                        .footer {
                          margin-top: 20px;
                          text-align: center;
                          font-size: 12px;
                          color: #777;
                        }
                        </style>
                        </head>
                        <body>
                        <div class="container">
                        <div class="header">
                          <h1>Cambio de Contraseña</h1>
                        </div>
                        <div class="content">
                          <p>Hola, <strong>${usuarioEncontrado.nombre} ${usuarioEncontrado.apellido}</strong> con <strong>DNI: ${usuarioEncontrado.dni}</strong></p>
                          <p>Hemos recibido una solicitud para cambiar la contraseña de tu cuenta. Tienes <strong>5 minutos</strong> hasta que el codigo expire.</p>
                          <p>Tu código de verificación es: <strong>${codigoVerificacion}</strong></p>
                          <p>Este código expirará el: <strong>${expiracionFormat}</strong></p>
                          <p>Si no solicitaste este cambio, por favor ignora este correo.</p>
                        </div>
                        <div class="footer">
                          <p>© 2023 RG SERVICIOS GENERALES. Todos los derechos reservados.</p>
                        </div>
                        </div>
                        </body>
                        </html>
`

    await this.mailService.sendMail(UpdatePasswordUsuarioDto.email, 'Cambio de contraseña', emailContent);

    return { message: 'Codigo de verificacion enviado al correo' };
  }

  //creamos el servicio para actualizar la contraseña
  async updatePasswordCode(dni: string, UpdatePasswordCodeUsuarioDto: UpdatePasswordCodeUsuarioDto) {
    const usuarioEncontrado = await this.usuarioRepository.findOneBy({
      dni: dni,
      resetCode: UpdatePasswordCodeUsuarioDto.resetCode,
      estado: true
    });

    if (!usuarioEncontrado) {
      return { message: 'Usuario no encontrado' };
    }

    if (!usuarioEncontrado.estado) {
      return { message: 'Usuario eliminado' };
    }

    //ahora verificamos si el codigo de verificacion ha expirado
    if (new Date() > usuarioEncontrado.resetCodeExpiration) {
      return { message: 'Codigo de verificacion expirado' };
    }

    //ahora pasamos a actualizar la contraseña del usuario
    await this.usuarioRepository.update(usuarioEncontrado.id, {
      password: await bcryptjs.hash(UpdatePasswordCodeUsuarioDto.password, 10),
      resetCode: null,
      resetCodeExpiration: null
    });

    return { message: 'Contraseña actualizada correctamente' };
  }

  async remove(id: number) {
    const usuarioEncontrado = await this.usuarioRepository.findOneBy({
      id: id,
      estado: true
    });

    if (!usuarioEncontrado) {
      return { message: 'Usuario no encontrado' };
    }

    if (!usuarioEncontrado.estado) {
      return { message: 'Usuario eliminado' };
    }

    await this.usuarioRepository.update(id, { estado: false });

    return { message: 'Usuario eliminado correctamente' };
  }

  buscarParaLogin(usuario: string) {
    return this.usuarioRepository.findOne({
      where: {
        usuario: usuario,
        estado: true
      },
      select: ["id", "usuario", "nombre", "apellido", "email", "password"]
    });
  }

  async buscarpermisosporidusuario(id: number) {
    //console.log("ID DE MI USUARIO", id);
    const usuarioEncontrado = await this.usuarioRepository.findOneBy({
      id: id
    });

    if (!usuarioEncontrado) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
    //buscamos los perfiles que le corresponde a cada usuario

    //console.log("USUARIO", usuarioEncontrado.perfil);
    const perfilUsuario = usuarioEncontrado.perfil;

    //recorremos con un foreach al detallePerfiles para extraer el permisos usando el servicio de permisos
    const permisos = await this.detallePermisos.buscarPermisosperfil(perfilUsuario);

    //console.log(permisos);

    const payload = {
      usuario: usuarioEncontrado,
      perfiles: permisos.perfiles,
      modulos: permisos.modulos,
      tablas: permisos.tablas
    };

    //console.log("PERMISOS DE MI USUARIO", payload);

    return payload;
  }
}
