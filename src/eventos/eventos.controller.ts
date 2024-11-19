import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EventosService } from './eventos.service';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { GetEventoDto } from './dto/get-evento.dto';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';

@ApiTags('eventos')
@Controller('eventos')
export class EventosController {
  constructor(private readonly eventosService: EventosService) { }

  @ApiBody({ type: CreateEventoDto })
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('eventos', 'post')
  create(@Body() createEventoDto: CreateEventoDto) {
    return this.eventosService.create(createEventoDto);
  }

  @ApiBody({ type: [GetEventoDto] })
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('eventos', 'get')
  findAll() {
    return this.eventosService.findAll();
  }

  @ApiBody({ type: [GetEventoDto] })
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('eventos', 'get')
  findOne(@Param('id') id: string) {
    return this.eventosService.findOne(+id);
  }

  @ApiBody({ type: CreateEventoDto })
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('eventos', 'put')
  update(@Param('id') id: string, @Body() updateEventoDto: UpdateEventoDto) {
    return this.eventosService.update(+id, updateEventoDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('eventos', 'delete')
  remove(@Param('id') id: string) {
    return this.eventosService.remove(+id);
  }
}
