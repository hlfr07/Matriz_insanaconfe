import { PartialType } from '@nestjs/swagger';
import { CreateDetallePermisoDto } from './create-detalle_permiso.dto';

export class UpdateDetallePermisoDto extends PartialType(CreateDetallePermisoDto) {}
