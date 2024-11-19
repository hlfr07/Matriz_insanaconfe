import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { Evento } from './entities/evento.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Matrix } from 'src/matrices/entities/matrix.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class EventosService {

  constructor(@InjectRepository(Evento) private eventoRepository: Repository<Evento>, @InjectRepository(Matrix) private matrixRepository: Repository<Matrix>, @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>) { }

  async create(createEventoDto: CreateEventoDto) {
    const EventoEncontrado = await this.eventoRepository.findOneBy({
      evento: createEventoDto.evento,
    });

    if (EventoEncontrado) {
      throw new HttpException('El evento ya existe', HttpStatus.CONFLICT);
    }

    const MatrixEncontrado = await this.matrixRepository.findOneBy({
      id: parseInt(createEventoDto.matrix_id)
    });

    if (!MatrixEncontrado) {
      throw new HttpException('Matriz no encontrada', HttpStatus.NOT_FOUND);
    }

    const UsuarioEncontrado = await this.usuarioRepository.findOneBy({
      id: parseInt(createEventoDto.usuario_id)
    });

    if (!UsuarioEncontrado) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    const nuevoEvento = this.eventoRepository.create({
      evento: createEventoDto.evento,
      probabilidad: createEventoDto.probabilidad,
      impacto: createEventoDto.impacto,
      valor: createEventoDto.valor,
      nivel_riesgo: createEventoDto.nivel_riesgo,
      matrix: MatrixEncontrado,
      usuario: UsuarioEncontrado,
    });

    await this.eventoRepository.save(nuevoEvento);

    return nuevoEvento;
  }

  findAll() {
    const eventos = this.eventoRepository.find({
      order: { id: 'DESC' }
    });

    return eventos;
  }

  async findOne(id: number) {
    const eventoEncontrado = await this.eventoRepository.findOneBy({
      id: id,
      estado: true
    });

    if (!eventoEncontrado) {
      throw new HttpException('Evento no encontrado', HttpStatus.NOT_FOUND);
    }

    if (!eventoEncontrado.estado) {
      throw new HttpException('Evento no encontrado', HttpStatus.NOT_FOUND);
    }

    return eventoEncontrado;
  }

  async update(id: number, updateEventoDto: UpdateEventoDto) {
    const eventoEncontrado = await this.eventoRepository.findOneBy({
      id: id,
    });

    if (!eventoEncontrado) {
      throw new HttpException('Evento no encontrado', HttpStatus.NOT_FOUND);
    }

    //comprobar la existencia de la matriz con el mismo nombre solo si el nombre es diferente
    if (updateEventoDto.evento !== eventoEncontrado.evento) {
      const eventoEncontrado = await this.eventoRepository.findOneBy({
        evento: updateEventoDto.evento
      });

      if (eventoEncontrado) {
        throw new HttpException('El evento ya existe', HttpStatus.CONFLICT);
      }
    }

    const MatrixEncontrado = await this.matrixRepository.findOneBy({
      id: parseInt(updateEventoDto.matrix_id)
    });

    if (!MatrixEncontrado) {
      throw new HttpException('Matriz no encontrada', HttpStatus.NOT_FOUND);
    }

    const UsuarioEncontrado = await this.usuarioRepository.findOneBy({
      id: parseInt(updateEventoDto.usuario_id)
    });

    if (!UsuarioEncontrado) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    await this.eventoRepository.update(id, {
      evento: updateEventoDto.evento,
      probabilidad: updateEventoDto.probabilidad,
      impacto: updateEventoDto.impacto,
      valor: updateEventoDto.valor,
      nivel_riesgo: updateEventoDto.nivel_riesgo,
      matrix: MatrixEncontrado,
      usuario: UsuarioEncontrado,
    });

    return { message: 'Evento actualizado correctamente' };
  }

  async remove(id: number) {
    const eventoEncontrado = await this.eventoRepository.findOneBy({
      id: id,
      estado: true
    });

    if (!eventoEncontrado) {
      throw new HttpException('Evento no encontrado', HttpStatus.NOT_FOUND);
    }

    if (!eventoEncontrado.estado) {
      throw new HttpException('Evento eliminado', HttpStatus.NOT_FOUND);
    }

    await this.eventoRepository.update(id, {
      estado: false
    });


    return { message: 'Evento eliminado correctamente' };
  }
}
