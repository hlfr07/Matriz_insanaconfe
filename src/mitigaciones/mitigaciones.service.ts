import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMitigacioneDto } from './dto/create-mitigacione.dto';
import { UpdateMitigacioneDto } from './dto/update-mitigacione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Mitigacione } from './entities/mitigacione.entity';
import { Repository } from 'typeorm';
import { Evento } from 'src/eventos/entities/evento.entity';

@Injectable()
export class MitigacionesService {
  constructor(@InjectRepository(Mitigacione) private mitigacionesRepository: Repository<Mitigacione>, @InjectRepository(Evento) private eventoRepository: Repository<Evento>) { }
  async create(createMitigacioneDto: CreateMitigacioneDto, pdf: string) {
    //primero verificaremos que pdf no sea nulo o indefinido
    if (!pdf) {
      throw new HttpException('El archivo PDF es requerido', HttpStatus.NOT_FOUND);
    }

    //verificamos que el evento exista
    const evento = await this.eventoRepository.findOneBy({
      id: parseInt(createMitigacioneDto.evento_id)
    });

    if (!evento) {
      throw new HttpException('El evento no existe', HttpStatus.NOT_FOUND);
    }

    //traemos la fecha actual en este formato 2021-09-01 y la hora actual tambien, estoy en perú

    const fecha = new Date().toLocaleString('es-PE', {
      timeZone: 'America/Lima'
    });

    //creamos la mitigación
    const mitigacion = this.mitigacionesRepository.create({
      pdf: pdf,
      cod: createMitigacioneDto.cod,
      evento: evento,
      fecha: fecha
    });

    //guardamos la mitigación
    await this.mitigacionesRepository.save(mitigacion);

    return mitigacion;

  }

  findAll() {
    const mitigaciones = this.mitigacionesRepository.find({
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number) {
    const mitigacion = await this.mitigacionesRepository.findOneBy({
      id: id,
      estado: true
    });

    if (!mitigacion) {
      throw new HttpException('Mitigación no encontrada', HttpStatus.NOT_FOUND);
    }

    if (mitigacion.estado === false) {
      throw new HttpException('Mitigación eliminada', HttpStatus.NOT_FOUND);
    }

    return mitigacion;
  }

  update(id: number, updateMitigacioneDto: UpdateMitigacioneDto) {
    return `This action updates a #${id} mitigacione`;
  }

  remove(id: number) {
    return `This action removes a #${id} mitigacione`;
  }
}
