import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DetallePermisosService } from './detalle_permisos.service';
import { CreateDetallePermisoDto } from './dto/create-detalle_permiso.dto';
import { UpdateDetallePermisoDto } from './dto/update-detalle_permiso.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { GetDetallePermisoDto } from './dto/get-detalle-permiso.dto';
import { Roles } from '../auth/roles/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';

@ApiTags('detalle-permisos')
@Controller('detalle-permisos')
export class DetallePermisosController {
  constructor(private readonly detallePermisosService: DetallePermisosService) { }

  @ApiBody({ type: CreateDetallePermisoDto })
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('detalle-permisos', 'post')
  create(@Body() createDetallePermisoDto: CreateDetallePermisoDto) {
    return this.detallePermisosService.create(createDetallePermisoDto);
  }

  @ApiBody({ type: [GetDetallePermisoDto] })
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('detalle-permisos', 'get')
  findAll() {
    return this.detallePermisosService.findAll();
  }

  @ApiBody({ type: GetDetallePermisoDto })
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('detalle-permisos', 'get')
  findOne(@Param('id') id: string) {
    return this.detallePermisosService.findOne(+id);
  }

  @ApiBody({ type: CreateDetallePermisoDto })
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('detalle-permisos', 'post')
  update(@Param('id') id: string, @Body() updateDetallePermisoDto: UpdateDetallePermisoDto) {
    return this.detallePermisosService.update(+id, updateDetallePermisoDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('detalle-permisos', 'post')
  remove(@Param('id') id: string) {
    return this.detallePermisosService.remove(+id);
  }
}
