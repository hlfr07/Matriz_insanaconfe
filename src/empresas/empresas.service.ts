import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Empresa } from './entities/empresa.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmpresasService {
  constructor(@InjectRepository(Empresa) private empresaRepository: Repository<Empresa>) { }
  async create(createEmpresaDto: CreateEmpresaDto) {
    const empresaExists = await this.empresaRepository.findOneBy({ empresa: createEmpresaDto.empresa });

    if (empresaExists) {
      throw new HttpException('La empresa ya existe', HttpStatus.NOT_FOUND);
    }

    const newEmpresa = this.empresaRepository.create({
      empresa: createEmpresaDto.empresa,
    });

    await this.empresaRepository.save(newEmpresa);

    return newEmpresa;
  }

  findAll() {
    const empresas = this.empresaRepository.find({
      order: { id: 'DESC' }
    });

    return empresas;
  }

  async findOne(id: number) {
    const empresa = await this.empresaRepository.findOneBy({
      id: id
    });

    if (!empresa) {
      throw new HttpException('La empresa no existe', HttpStatus.NOT_FOUND);
    }

    return empresa;
  }

  async update(id: number, updateEmpresaDto: UpdateEmpresaDto) {
    const empresaExists = await this.empresaRepository.findOneBy({ id: id });

    if (!empresaExists) {
      throw new HttpException('La empresa no existe', HttpStatus.NOT_FOUND);
    }

    //comprobar la existencia de la empresa con el mismo nombre solo si el nombre es diferente
    if (updateEmpresaDto.empresa !== empresaExists.empresa) {
      const empresaExists = await this.empresaRepository.findOneBy({ empresa: updateEmpresaDto.empresa });

      if (empresaExists) {
        throw new HttpException('La empresa ya existe', HttpStatus.NOT_FOUND);
      }
    }

    empresaExists.empresa = updateEmpresaDto.empresa;

    await this.empresaRepository.update(id, empresaExists);

    return { message: 'La empresa ha sido actualizada' };
  }

  async remove(id: number) {
    const empresa = await this.empresaRepository.findOneBy({ id: id });

    if (!empresa) {
      throw new HttpException('La empresa no existe', HttpStatus.NOT_FOUND);
    }

    if (!empresa.estado) {
      throw new HttpException('La empresa ya ha sido eliminada', HttpStatus.NOT_FOUND);
    }

    await this.empresaRepository.update(id, { estado: false });

    return { message: 'La empresa ha sido eliminada' };
  }
}
