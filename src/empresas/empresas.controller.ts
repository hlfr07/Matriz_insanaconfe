import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { GetEmpresaDto } from './dto/get-empresa.dto';

@ApiTags('Empresas')
@Controller('empresas')
export class EmpresasController {
  constructor(private readonly empresasService: EmpresasService) {}


  @ApiBody({ type: CreateEmpresaDto })
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('empresas', 'post')
  create(@Body() createEmpresaDto: CreateEmpresaDto) {
    return this.empresasService.create(createEmpresaDto);
  }

  @ApiBody({ type: [GetEmpresaDto]})
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.empresasService.findAll();
  }

  @ApiBody({ type: GetEmpresaDto })
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.empresasService.findOne(+id);
  }

  @ApiBody({ type: CreateEmpresaDto })
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('empresas', 'put')
  update(@Param('id') id: string, @Body() updateEmpresaDto: UpdateEmpresaDto) {
    return this.empresasService.update(+id, updateEmpresaDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('empresas', 'delete')
  remove(@Param('id') id: string) {
    return this.empresasService.remove(+id);
  }
}
