import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSesioneDto } from './dto/create-sesione.dto';
import { UpdateSesioneDto } from './dto/update-sesione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Repository } from 'typeorm';
import { Sesione } from './entities/sesione.entity';

@Injectable()
export class SesionesService {
  constructor(@InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Sesione) private sesioneRepository: Repository<Sesione>) { }

  async create(createSesioneDto: CreateSesioneDto) {
    const usuarioEncontrado = await this.usuarioRepository.findOneBy({
      id: parseInt(createSesioneDto.id_usuario)
    });

    if (!usuarioEncontrado) {
      throw new HttpException('El usuario no existe', HttpStatus.CONFLICT);
    }

    const nuevaSesione = this.sesioneRepository.create({
      fecha: createSesioneDto.fecha,
      hora: createSesioneDto.hora,
      usuario: usuarioEncontrado
    });

    await this.sesioneRepository.save(nuevaSesione);

    return nuevaSesione;
  }

  findAll() {
    const sesiones = this.sesioneRepository.find({
      order: { id: 'DESC' }
    });

    return sesiones;
  }

  async findOne(id: number) {
    const sesioneEncontrada = await this.sesioneRepository.findOneBy({
      id: id,
      estado: true
    });

    if (!sesioneEncontrada) {
      throw new HttpException('Sesione no encontrada', HttpStatus.NOT_FOUND);
    }

    if (!sesioneEncontrada.estado) {
      throw new HttpException('Sesione no encontrada', HttpStatus.NOT_FOUND);
    }

    return sesioneEncontrada;
  }

  async update(id: number, updateSesioneDto: UpdateSesioneDto) {
    const sesioneEncontrada = await this.sesioneRepository.findOneBy({
      id: id,
    });

    if (!sesioneEncontrada) {
      throw new HttpException('Sesione no encontrada', HttpStatus.NOT_FOUND);
    }

    if (!sesioneEncontrada.estado) {
      throw new HttpException('Sesione no encontrada', HttpStatus.NOT_FOUND);
    }

    const usuarioEncontrado = await this.usuarioRepository.findOneBy({
      id: parseInt(updateSesioneDto.id_usuario)
    });

    if (!usuarioEncontrado) {
      throw new HttpException('El usuario no existe', HttpStatus.CONFLICT);
    }

    await this.sesioneRepository.update(id, {
      fecha: updateSesioneDto.fecha,
      hora: updateSesioneDto.hora,
      usuario: usuarioEncontrado
    });

    return { message: 'Sesione actualizada correctamente' };
  }

  async remove(id: number) {
    // const sesioneEncontrada = await this.sesioneRepository.findOneBy({
    //   id: id,
    //   estado: true
    // });

    // if (!sesioneEncontrada) {
    //   throw new HttpException('Sesione no encontrada', HttpStatus.NOT_FOUND);
    // }

    // if (!sesioneEncontrada.estado) {
    //   throw new HttpException('Sesione no encontrada', HttpStatus.NOT_FOUND);
    // }

    // await this.sesioneRepository.update(id, {
    //   estado: false
    // });

    const sesiones = await this.sesioneRepository.find({
    });

    //recorremos las sesiones para extraer el id de la sesion
    let idSesion = 0;

    sesiones.forEach(sesion => {
      if (sesion.usuario.id === id) {
        idSesion = sesion.id;
      }
    });

    await this.sesioneRepository.update(idSesion, {
      estado: false
    });

    return { message: 'Sesione finalizada correctamente' };
  }

  async buscarSesionesPorUsuario(id_usuario: number) {
    const sesiones = await this.sesioneRepository.find({
    });

    //recorremos las sesiones para buscar el usuario
    let sesionesUsuario = false;

    sesiones.forEach(sesion => {
      if (sesion.usuario.id === id_usuario) {
        console.log("SESION", sesion.estado);
        if (sesion.estado) {
          sesionesUsuario = true;
        }
      }
    });

    console.log("SESIONES USUARIO", sesionesUsuario);

    return sesionesUsuario;
  }

  async activarSesionesPorUsuario(id_usuario: number) {
    const sesiones = await this.sesioneRepository.find({
    });

    //recorremos las sesiones para extraer el id de la sesion
    let idSesion = 0;

    sesiones.forEach(sesion => {
      if (sesion.usuario.id === id_usuario) {
        idSesion = sesion.id;
      }
    });

    await this.sesioneRepository.update(idSesion, {
      estado: true
    });
  }
}
