import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { MitigacionesService } from './mitigaciones.service';
import { CreateMitigacioneDto } from './dto/create-mitigacione.dto';
import { UpdateMitigacioneDto } from './dto/update-mitigacione.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import GetMitigacioneDto from './dto/get-mitigcione.dto';

@ApiTags('mitigaciones')
@Controller('mitigaciones')
export class MitigacionesController {
  constructor(private readonly mitigacionesService: MitigacionesService) { }

 

  @ApiBody({ type: [GetMitigacioneDto] })
  @Get()
  findAll() {
    return this.mitigacionesService.findAll();
  }

  @ApiBody({ type: GetMitigacioneDto })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mitigacionesService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMitigacioneDto: UpdateMitigacioneDto) {
  //   return this.mitigacionesService.update(+id, updateMitigacioneDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.mitigacionesService.remove(+id);
  // }
}
