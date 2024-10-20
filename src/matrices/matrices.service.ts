import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMatrixDto } from './dto/create-matrix.dto';
import { UpdateMatrixDto } from './dto/update-matrix.dto';
import { Matrix } from './entities/matrix.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class MatricesService {
  constructor(@InjectRepository(Matrix) private matrixRepository: Repository<Matrix>, @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>) { }
  async create(createMatrixDto: CreateMatrixDto) {
    const matrixEncontrado = await this.matrixRepository.findOneBy({
      empresa: createMatrixDto.empresa,
      nombre: createMatrixDto.nombre,
    });

    if (matrixEncontrado) {
      throw new HttpException('La matriz ya existe', HttpStatus.CONFLICT);
    }

    const usuarioEncontrado = await this.usuarioRepository.findOneBy({
      id: parseInt(createMatrixDto.id_usuario)
    });

    const nuevaMatrix = this.matrixRepository.create({
      empresa: createMatrixDto.empresa,
      nombre: createMatrixDto.nombre,
      filas: parseInt(createMatrixDto.filas),
      columnas: parseInt(createMatrixDto.columnas),
      fecha: createMatrixDto.fecha,
      hora: createMatrixDto.hora,
      usuario: usuarioEncontrado,
    });

    //guardamos y retornamos el la nueva matriz
    await this.matrixRepository.save(nuevaMatrix);

    return nuevaMatrix;

  }

  findAll() {
    const matrices = this.matrixRepository.find({
      order: { id: 'DESC' }
    });

    return matrices;
  }

  async findOne(id: number) {
    const matrixEncontrado = await this.matrixRepository.findOneBy({
      id: id,
      estado: true
    });

    if (!matrixEncontrado) {
      throw new HttpException('Matriz no encontrada', HttpStatus.NOT_FOUND);
    }

    if (!matrixEncontrado.estado) {
      throw new HttpException('Matriz no encontrada', HttpStatus.NOT_FOUND);
    }

    return matrixEncontrado;
  }

  async update(id: number, updateMatrixDto: UpdateMatrixDto) {
    const matrixEncontrado = await this.matrixRepository.findOneBy({
      id: id,
    });

    if (!matrixEncontrado) {
      throw new HttpException('Matriz no encontrada', HttpStatus.NOT_FOUND);
    }

    //comprobar la existencia de la matriz con el mismo nombre solo si el nombre es diferente
    if (updateMatrixDto.nombre !== matrixEncontrado.nombre) {
      const matrixEncontrado = await this.matrixRepository.findOneBy({
        nombre: updateMatrixDto.nombre
      });

      if (matrixEncontrado) {
        throw new HttpException('La matriz ya existe', HttpStatus.CONFLICT);
      }
    }

    const usuarioEncontrado = await this.usuarioRepository.findOneBy({
      id: parseInt(updateMatrixDto.id_usuario)
    });

    await this.matrixRepository.update(id, {
      empresa: updateMatrixDto.empresa,
      nombre: updateMatrixDto.nombre,
      filas: parseInt(updateMatrixDto.filas),
      columnas: parseInt(updateMatrixDto.columnas),
      fecha: updateMatrixDto.fecha,
      hora: updateMatrixDto.hora,
      usuario: usuarioEncontrado
    });

    return { message: 'Matriz actualizada correctamente' };
  }

  async remove(id: number) {
    const matrixEncontrado = await this.matrixRepository.findOneBy({
      id: id,
      estado: true
    });

    if (!matrixEncontrado) {
      throw new HttpException('Matriz no encontrada', HttpStatus.NOT_FOUND);
    }

    if (!matrixEncontrado.estado) {
      throw new HttpException('Matriz eliminada', HttpStatus.NOT_FOUND);
    }

    await this.matrixRepository.update(id, {
      estado: false
    });

    return { message: 'Matriz eliminada correctamente' };
  }
}
