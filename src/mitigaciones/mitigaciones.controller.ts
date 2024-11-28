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

  @ApiConsumes('multipart/form-data') // Especifica el tipo de contenido
  @ApiBody({
    description: 'Subir un archivo zip o rar junto con los datos de la actividad. <strong>Usar multipart/form-data</strong>',
    type: CreateMitigacioneDto,
  })
  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',  // Carpeta donde se guardarán los archivos
      filename: (req, file, cb) => {
        // Genera un nombre único para el archivo
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;

        // Sanitiza el nombre original del archivo para eliminar espacios y caracteres no deseados
        const sanitizedOriginalName = file.originalname.replace(/\s/g, '-').replace(/[^a-zA-Z0-9.-]/g, '');

        // Crea el nombre final del archivo con el sufijo único
        const filename = `${uniqueSuffix}-${sanitizedOriginalName}`;

        // Llama a la función de callback con el nuevo nombre de archivo
        cb(null, filename);
      },
    }),
    fileFilter: (req, file, cb) => {
      // Aceptar solo archivos zip o rar
      cb(null, true);  // Acepta cualquier archivo
    },
  }))
  create(@UploadedFile() file: Express.Multer.File, @Body() createMitigacioneDto: CreateMitigacioneDto) {
    console.log('Archivo recibido:', file);  // Verifica si el archivo se recibe correctamente
    console.log('Datos del formulario:', createMitigacioneDto);  // Verifica los datos del formulario
    return this.mitigacionesService.create(createMitigacioneDto, file.filename);
  }

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
