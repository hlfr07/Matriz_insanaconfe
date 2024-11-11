import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDetallePermisoDto } from './dto/create-detalle_permiso.dto';
import { UpdateDetallePermisoDto } from './dto/update-detalle_permiso.dto';
import { DetallePermiso } from './entities/detalle_permiso.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Modulo } from 'src/modulos/entities/modulo.entity';
import { Tabla } from 'src/tablas/entities/tabla.entity';
import { Perfile } from 'src/perfiles/entities/perfile.entity';

@Injectable()
export class DetallePermisosService {
  //creamos el constructor para usar el srvicio de detallepermisos
  constructor(@InjectRepository(DetallePermiso) private detallePermisoRepository: Repository<DetallePermiso>, @InjectRepository(Modulo) private moduloRepository: Repository<Modulo>, @InjectRepository(Tabla) private tablaRepository: Repository<Tabla>, @InjectRepository(Perfile) private perfileRepository: Repository<Perfile>) { }
  async create(createDetallePermisoDto: CreateDetallePermisoDto) {

    //verificamos si el id_modulo existe
    const moduloExistente = await this.moduloRepository.findOneBy({
      id: parseInt(createDetallePermisoDto.id_modulo)
    });

    //verificamos si el id_tabla existe
    const tablaExistente = await this.tablaRepository.findOneBy({
      id: parseInt(createDetallePermisoDto.id_tabla)
    });

    //verificamos si el id_perfil existe
    const perfileExistente = await this.perfileRepository.findOneBy({
      id: parseInt(createDetallePermisoDto.id_perfil)
    });

    if (!moduloExistente) {
      throw new HttpException('Modulo no existe', HttpStatus.NOT_FOUND);
    }

    if (!tablaExistente) {
      throw new HttpException('Tabla no existe', HttpStatus.NOT_FOUND);
    }

    if (!perfileExistente) {
      throw new HttpException('Perfil no existe', HttpStatus.NOT_FOUND);
    }

    const detallePermisoExistente = await this.detallePermisoRepository.findOneBy({
      modulo: moduloExistente,
      tabla: tablaExistente,
      perfil: perfileExistente
    });

    if (detallePermisoExistente) {
      throw new HttpException('El detallePermiso ya existe', HttpStatus.CONFLICT);
    }

    //verificamos que los campos get, post, put, delete tengan valores false o true
    if (createDetallePermisoDto.get !== 'true' && createDetallePermisoDto.get !== 'false') {
      throw new HttpException('El campo get debe ser true o false', HttpStatus.BAD_REQUEST);
    }

    if (createDetallePermisoDto.post !== 'true' && createDetallePermisoDto.post !== 'false') {
      throw new HttpException('El campo post debe ser true o false', HttpStatus.BAD_REQUEST);
    }

    if (createDetallePermisoDto.put !== 'true' && createDetallePermisoDto.put !== 'false') {
      throw new HttpException('El campo put debe ser true o false', HttpStatus.BAD_REQUEST);
    }

    if (createDetallePermisoDto.delete !== 'true' && createDetallePermisoDto.delete !== 'false') {
      throw new HttpException('El campo delete debe ser true o false', HttpStatus.BAD_REQUEST);
    }

    //creamos el detallePermiso
    const nuevoDetallePermiso = this.detallePermisoRepository.create({
      modulo: moduloExistente,
      tabla: tablaExistente,
      perfil: perfileExistente,
      get: createDetallePermisoDto.get === 'true' ? true : false,
      post: createDetallePermisoDto.post === 'true' ? true : false,
      put: createDetallePermisoDto.put === 'true' ? true : false,
      delete: createDetallePermisoDto.delete === 'true' ? true : false
    });

    //guardamos el detallePermiso
    await this.detallePermisoRepository.save(nuevoDetallePermiso);

    return nuevoDetallePermiso;
  }

  findAll() {
    const detallePermisos = this.detallePermisoRepository.find({
      order: { id: 'DESC' },
    });

    return detallePermisos;
  }

  async findOne(id: number) {
    const detallePermiso = await this.detallePermisoRepository.findOneBy({
      id: id
    });

    if (!detallePermiso) {
      throw new HttpException('DetallePermiso no encontrado', HttpStatus.NOT_FOUND);
    }

    if (!detallePermiso.estado) {
      throw new HttpException('DetallePermiso no encontrado', HttpStatus.NOT_FOUND);
    }

    return detallePermiso;
  }

  async update(id: number, updateDetallePermisoDto: UpdateDetallePermisoDto) {
    //verificamos si el detallePermiso existe
    const detallePermisoExistente = await this.detallePermisoRepository.findOneBy({
      id: id
    });

    if (!detallePermisoExistente) {
      throw new HttpException('DetallePermiso no encontrado', HttpStatus.NOT_FOUND);
    }

    //verificamos si el id_modulo existe
    const moduloExistente = await this.moduloRepository.findOneBy({
      id: parseInt(updateDetallePermisoDto.id_modulo)
    });

    //verificamos si el id_tabla existe
    const tablaExistente = await this.tablaRepository.findOneBy({
      id: parseInt(updateDetallePermisoDto.id_tabla)
    });

    //verificamos si el id_perfil existe
    const perfileExistente = await this.perfileRepository.findOneBy({
      id: parseInt(updateDetallePermisoDto.id_perfil)
    });

    if (!moduloExistente) {
      throw new HttpException('Modulo no existe', HttpStatus.NOT_FOUND);
    }

    if (!tablaExistente) {
      throw new HttpException('Tabla no existe', HttpStatus.NOT_FOUND);
    }

    if (!perfileExistente) {
      throw new HttpException('Perfil no existe', HttpStatus.NOT_FOUND);
    }

    //comprobamos que si al actualizar hay un permiso con los mismos datos, no se actualice
    const detallePermisoExistenteNuevo = await this.detallePermisoRepository.findOneBy({
      modulo: moduloExistente,
      tabla: tablaExistente,
      perfil: perfileExistente
    });

    if (detallePermisoExistenteNuevo && detallePermisoExistenteNuevo.id !== id) {
      throw new HttpException('El detallePermiso ya existe', HttpStatus.CONFLICT);
    }

    //verificamos que los campos get, post, put, delete tengan valores false o true
    if (updateDetallePermisoDto.get !== 'true' && updateDetallePermisoDto.get !== 'false') {
      throw new HttpException('El campo get debe ser true o false', HttpStatus.BAD_REQUEST);
    }

    if (updateDetallePermisoDto.post !== 'true' && updateDetallePermisoDto.post !== 'false') {
      throw new HttpException('El campo post debe ser true o false', HttpStatus.BAD_REQUEST);
    }

    if (updateDetallePermisoDto.put !== 'true' && updateDetallePermisoDto.put !== 'false') {
      throw new HttpException('El campo put debe ser true o false', HttpStatus.BAD_REQUEST);
    }

    if (updateDetallePermisoDto.delete !== 'true' && updateDetallePermisoDto.delete !== 'false') {
      throw new HttpException('El campo delete debe ser true o false', HttpStatus.BAD_REQUEST);
    }

    //actualizamos el detallePermiso
    await this.detallePermisoRepository.update(id, {
      modulo: moduloExistente,
      tabla: tablaExistente,
      perfil: perfileExistente,
      get: updateDetallePermisoDto.get === 'true' ? true : false,
      post: updateDetallePermisoDto.post === 'true' ? true : false,
      put: updateDetallePermisoDto.put === 'true' ? true : false,
      delete: updateDetallePermisoDto.delete === 'true' ? true : false
    });

    return { message: 'DetallePermiso actualizado correctamente' };

  }

  async remove(id: number) {
    //verificamos si el detallePermiso existe
    const detallePermisoExistente = await this.detallePermisoRepository.findOneBy({
      id: id
    });

    if (!detallePermisoExistente) {
      throw new HttpException('DetallePermiso no encontrado', HttpStatus.NOT_FOUND);
    }

    if (!detallePermisoExistente.estado) {
      throw new HttpException('DetallePermiso eliminado', HttpStatus.NOT_FOUND);
    }

    //eliminamos el detallePermiso
    await this.detallePermisoRepository.update(id, {
      estado: false
    });

    return { message: 'DetallePermiso eliminado correctamente' };
  }

  async buscarPermisosperfil(detalleperfil: any) {
    //primero estraemos todos los permisos
    const permisos = await this.detallePermisoRepository.find({
      where: {
        estado: true
      }
    });

    //ahora recorremos un foreach el detalleperfil para extraer el perfil
    const perfilesEncontrados = [];
    const moduloEncontrados = [];
    const tablaEncontrados = [];
    //aca recorremos permisos para extraer los permisos
    permisos.forEach(permiso => {
      if (permiso.perfil.id === detalleperfil.id) {
        perfilesEncontrados.push(permiso.perfil);
        moduloEncontrados.push(permiso.modulo);
        const tablaConPermiso = {
          tabla: permiso.tabla,
          permiso: {
            get: permiso.get,
            post: permiso.post,
            put: permiso.put,
            delete: permiso.delete
          }
        };
        tablaEncontrados.push(tablaConPermiso);
      }
    });

    // console.log("--------------------PERMISOS ANTES-------------------");
    // console.log(perfilesEncontrados);
    // console.log(moduloEncontrados);
    // console.log(tablaEncontrados);
    // console.log("-------------------- FIN PERMISOS ANTES-------------------");

    //antes de retornar nos aeguraremos que modulos y perfiles no tengan datos repetidos, comprueba usando el id
    const modulos = moduloEncontrados.filter((valor, indiceActual, arreglo) => arreglo.findIndex(modulo => modulo.id === valor.id) === indiceActual);
    const perfiles = perfilesEncontrados.filter((valor, indiceActual, arreglo) => arreglo.findIndex(perfil => perfil.id === valor.id) === indiceActual);
    //si existe tabla repetida actualizamos los permiso.get o permiso.post o permiso.delete o permiso.put que esten en true, osea si una tabla repetida tiene un permiso en true, se actualiza a true
    const tablasFiltradas = [];

    tablaEncontrados.forEach(tabla => {
      let existe = false;

      tablasFiltradas.forEach(tablaFiltrada => {
        //console.log(tablaFiltrada.tabla.id, tabla.tabla.id);
        if (tablaFiltrada.tabla.id === tabla.tabla.id) {
          existe = true;
          //si existe actualizamos los permiso.get o permiso.post o permiso.delete o permiso.put que esten en true
          if (tabla.permiso.get) {
            tablaFiltrada.permiso.get = true;
            //console.log(tablaFiltrada.permiso.get);
          }
          if (tabla.permiso.post) {
            tablaFiltrada.permiso.post = true;
            //console.log(tablaFiltrada.permiso.post);
          }
          if (tabla.permiso.delete) {
            tablaFiltrada.permiso.delete = true;
            //console.log(tablaFiltrada.permiso.delete);
          }
          if (tabla.permiso.put) {
            tablaFiltrada.permiso.put = true;
            //console.log(tablaFiltrada.permiso.put);
          }
        }
      });

      if (!existe) {
        tablasFiltradas.push(tabla);
      }
    });

    // console.log("--------------------PERMISOS DESPUES-------------------");
    // console.log(modulos);
    // console.log(perfiles);
    // console.log(tablasFiltradas);
    // console.log("-------------------- FIN PERMISOS DESPUES-------------------");

    return {
      modulos: modulos,
      perfiles: perfiles,
      tablas: tablasFiltradas
    };

  }
}
