import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MatrizValoresService } from './matriz_valores.service';
import { CreateMatrizValoreDto } from './dto/create-matriz_valore.dto';
import { UpdateMatrizValoreDto } from './dto/update-matriz_valore.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { GetMatrizValoresDto } from './dto/get-matriz_valores.dto';

@ApiTags('matriz-valores')
@Controller('matriz-valores')
export class MatrizValoresController {
  constructor(private readonly matrizValoresService: MatrizValoresService) { }

  @ApiBody({ type: CreateMatrizValoreDto })
  @Post()
  create(@Body() createMatrizValoreDto: CreateMatrizValoreDto) {
    return this.matrizValoresService.create(createMatrizValoreDto);
  }

  @ApiBody({ type: [GetMatrizValoresDto] })
  @Get()
  findAll() {
    return this.matrizValoresService.findAll();
  }

  @ApiBody({ type: [GetMatrizValoresDto] })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.matrizValoresService.findOne(+id);
  }

  @ApiBody({ type: CreateMatrizValoreDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMatrizValoreDto: UpdateMatrizValoreDto) {
    return this.matrizValoresService.update(+id, updateMatrizValoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.matrizValoresService.remove(+id);
  }
}
