import { PartialType } from '@nestjs/swagger';
import { CreateMatrizValoreDto } from './create-matriz_valore.dto';

export class UpdateMatrizValoreDto extends PartialType(CreateMatrizValoreDto) {}
