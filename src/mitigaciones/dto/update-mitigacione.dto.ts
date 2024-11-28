import { PartialType } from '@nestjs/swagger';
import { CreateMitigacioneDto } from './create-mitigacione.dto';

export class UpdateMitigacioneDto extends PartialType(CreateMitigacioneDto) {}
