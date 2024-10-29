import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetallePermisosService } from './detalle_permisos.service';
import { CreateDetallePermisoDto } from './dto/create-detalle_permiso.dto';
import { UpdateDetallePermisoDto } from './dto/update-detalle_permiso.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { GetDetallePermisoDto } from './dto/get-detalle-permiso.dto';

@ApiTags('detalle-permisos')
@Controller('detalle-permisos')
export class DetallePermisosController {
  constructor(private readonly detallePermisosService: DetallePermisosService) { }

  @ApiBody({ type: CreateDetallePermisoDto })
  @Post()
  create(@Body() createDetallePermisoDto: CreateDetallePermisoDto) {
    return this.detallePermisosService.create(createDetallePermisoDto);
  }

  @ApiBody({ type: [GetDetallePermisoDto] })
  @Get()
  findAll() {
    return this.detallePermisosService.findAll();
  }

  @ApiBody({ type: [GetDetallePermisoDto] })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detallePermisosService.findOne(+id);
  }

  @ApiBody({ type: CreateDetallePermisoDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetallePermisoDto: UpdateDetallePermisoDto) {
    return this.detallePermisosService.update(+id, updateDetallePermisoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detallePermisosService.remove(+id);
  }
}
