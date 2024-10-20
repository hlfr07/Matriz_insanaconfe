import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMatrizValoreDto } from './dto/create-matriz_valore.dto';
import { UpdateMatrizValoreDto } from './dto/update-matriz_valore.dto';
import { MatrizValore } from './entities/matriz_valore.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Matrix } from 'src/matrices/entities/matrix.entity';

@Injectable()
export class MatrizValoresService {

  constructor(@InjectRepository(MatrizValore) private MatrizValoreRepository: Repository<MatrizValore>, @InjectRepository(Matrix) private matrixRepository: Repository<Matrix>) { }

  async create(createMatrizValoreDto: CreateMatrizValoreDto) {
    const MatrixEncontrado = await this.matrixRepository.findOneBy({
      id: parseInt(createMatrizValoreDto.id_matriz)
    });

    if (!MatrixEncontrado) {
      throw new HttpException('Matriz no encontrada', HttpStatus.NOT_FOUND);
    }

    const nuevoMatrizValore = this.MatrizValoreRepository.create({
      probabilidad: createMatrizValoreDto.probabilidad,
      valorprobabilidad: createMatrizValoreDto.valorprobabilidad,
      impacto: createMatrizValoreDto.impacto,
      valorimpacto: createMatrizValoreDto.valorimpacto,
      matrix: MatrixEncontrado
    });

    await this.MatrizValoreRepository.save(nuevoMatrizValore);

    return nuevoMatrizValore;
  }

  findAll() {
    const MatrizValore = this.MatrizValoreRepository.find({
      order: { id: 'DESC' }
    });

    return MatrizValore;
  }

  async findOne(id: number) {
    const MatrizValoreEncontrado = await this.MatrizValoreRepository.findOneBy({
      id: id,
      estado: true
    });

    if (!MatrizValoreEncontrado) {
      throw new HttpException('MatrizValore no encontrado', HttpStatus.NOT_FOUND);
    }

    if (!MatrizValoreEncontrado.estado) {
      throw new HttpException('MatrizValore no encontrado', HttpStatus.NOT_FOUND);
    }

    return MatrizValoreEncontrado;
  }

  async update(id: number, updateMatrizValoreDto: UpdateMatrizValoreDto) {
    const MatrizValoreEncontrado = await this.MatrizValoreRepository.findOneBy({
      id: id
    });

    if (!MatrizValoreEncontrado) {
      throw new HttpException('MatrizValore no encontrado', HttpStatus.NOT_FOUND);
    }

    const MatrixEncontrado = await this.matrixRepository.findOneBy({
      id: parseInt(updateMatrizValoreDto.id_matriz)
    });

    if (!MatrixEncontrado) {
      throw new HttpException('Matriz no encontrada', HttpStatus.NOT_FOUND);
    }

    await this.MatrizValoreRepository.update(id, {
      probabilidad: updateMatrizValoreDto.probabilidad,
      valorprobabilidad: updateMatrizValoreDto.valorprobabilidad,
      impacto: updateMatrizValoreDto.impacto,
      valorimpacto: updateMatrizValoreDto.valorimpacto,
      matrix: MatrixEncontrado
    });

    return { message: 'MatrizValore actualizado correctamente' };
  }

  async remove(id: number) {
    const MatrizValoreEncontrado = await this.MatrizValoreRepository.findOneBy({
      id: id
    });

    if (!MatrizValoreEncontrado) {
      throw new HttpException('MatrizValore no encontrado', HttpStatus.NOT_FOUND);
    }

    if (!MatrizValoreEncontrado.estado) {
      throw new HttpException('MatrizValore eliminada', HttpStatus.NOT_FOUND);
    }

    await this.MatrizValoreRepository.update(id, {
      estado: false
    });

    return { message: 'MatrizValore eliminado correctamente' };
  }
}
