import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MatrizValoresService } from './matriz_valores.service';
import { CreateMatrizValoreDto } from './dto/create-matriz_valore.dto';
import { UpdateMatrizValoreDto } from './dto/update-matriz_valore.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { GetMatrizValoresDto } from './dto/get-matriz_valores.dto';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';

@ApiTags('matriz-valores')
@Controller('matriz-valores')
export class MatrizValoresController {
  constructor(private readonly matrizValoresService: MatrizValoresService) { }

  @ApiBody({ type: CreateMatrizValoreDto })
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('matriz-valores', 'post')
  create(@Body() createMatrizValoreDto: CreateMatrizValoreDto) {
    return this.matrizValoresService.create(createMatrizValoreDto);
  }

  @ApiBody({ type: [GetMatrizValoresDto] })
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.matrizValoresService.findAll();
  }

  @ApiBody({ type: GetMatrizValoresDto })
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.matrizValoresService.findOne(+id);
  }

  @ApiBody({ type: CreateMatrizValoreDto })
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('matriz-valores', 'put')
  update(@Param('id') id: string, @Body() updateMatrizValoreDto: UpdateMatrizValoreDto) {
    return this.matrizValoresService.update(+id, updateMatrizValoreDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('matriz-valores', 'delete')
  remove(@Param('id') id: string) {
    return this.matrizValoresService.remove(+id);
  }
}
