import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRiesgoDto } from './dto/create-riesgo.dto';
import { UpdateRiesgoDto } from './dto/update-riesgo.dto';
import { Riesgo } from './entities/riesgo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Matrix } from 'src/matrices/entities/matrix.entity';

@Injectable()
export class RiesgosService {
  constructor(@InjectRepository(Riesgo) private riesgoRepository: Repository<Riesgo>, @InjectRepository(Matrix) private matrixRepository: Repository<Matrix>) { }

  async create(createRiesgoDto: CreateRiesgoDto) {

    const matrixEncontrada = await this.matrixRepository.findOneBy({
      id: parseInt(createRiesgoDto.id_matriz)
    });

    if (!matrixEncontrada) {
      throw new HttpException('Matriz no encontrada', HttpStatus.NOT_FOUND);
    }

    const nuevoriesgo = this.riesgoRepository.create({
      de_amarillo: parseInt(createRiesgoDto.de_amarillo),
      a_amarillo: parseInt(createRiesgoDto.a_amarillo),
      de_naranja: parseInt(createRiesgoDto.de_naranja),
      a_naranja: parseInt(createRiesgoDto.a_naranja),
      de_rojo: parseInt(createRiesgoDto.de_rojo),
      a_rojo: parseInt(createRiesgoDto.a_rojo),
      de_verde: parseInt(createRiesgoDto.de_verde),
      a_verde: parseInt(createRiesgoDto.a_verde),
      matrix: matrixEncontrada
    });

    await this.riesgoRepository.save(nuevoriesgo);

    return nuevoriesgo;
  }

  findAll() {
    const riesgo = this.riesgoRepository.find({
      order: { id: 'DESC' }
    });

    return riesgo;
  }

  async findOne(id: number) {
    const riesgoEncontrado = await this.riesgoRepository.findOneBy({
      id: id,
      estado: true
    });

    if (!riesgoEncontrado) {
      throw new HttpException('Riesgo no encontrado', HttpStatus.NOT_FOUND);
    }

    if (!riesgoEncontrado.estado) {
      throw new HttpException('Riesgo no encontrado', HttpStatus.NOT_FOUND);
    }

    return riesgoEncontrado;
  }

  async update(id: number, updateRiesgoDto: UpdateRiesgoDto) {
    const riesgoEncontrado = await this.riesgoRepository.findOneBy({
      id: id,
    });

    if (!riesgoEncontrado) {
      throw new HttpException('Riesgo no encontrado', HttpStatus.NOT_FOUND);
    }

    const matrixEncontrada = await this.matrixRepository.findOneBy({
      id: parseInt(updateRiesgoDto.id_matriz)
    });

    if (!matrixEncontrada) {
      throw new HttpException('Matriz no encontrada', HttpStatus.NOT_FOUND);
    }

    await this.riesgoRepository.update(riesgoEncontrado, {
      de_amarillo: parseInt(updateRiesgoDto.de_amarillo),
      a_amarillo: parseInt(updateRiesgoDto.a_amarillo),
      de_naranja: parseInt(updateRiesgoDto.de_naranja),
      a_naranja: parseInt(updateRiesgoDto.a_naranja),
      de_rojo: parseInt(updateRiesgoDto.de_rojo),
      a_rojo: parseInt(updateRiesgoDto.a_rojo),
      de_verde: parseInt(updateRiesgoDto.de_verde),
      a_verde: parseInt(updateRiesgoDto.a_verde),
      matrix: matrixEncontrada
    });

    return { message: 'Riesgo actualizado correctamente' };
  }

  async remove(id: number) {
    const riesgoEncontrado = await this.riesgoRepository.findOneBy({
      id: id,
    });

    if (!riesgoEncontrado) {
      throw new HttpException('Riesgo no encontrado', HttpStatus.NOT_FOUND);
    }

    if (!riesgoEncontrado.estado) {
      throw new HttpException('Riesgo eliminado', HttpStatus.NOT_FOUND);
    }

    await this.riesgoRepository.update(riesgoEncontrado, {
      estado: false
    });

    return { message: 'Riesgo eliminado correctamente' };
  }
}
