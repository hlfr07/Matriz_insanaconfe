import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateEmpresaDto {
    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'La empresa no puede estar vacía' })
    @IsString({ message: 'La empresa debe ser un texto' })
    @MaxLength(255, { message: 'La empresa debe tener menos de 255 caracteres' })
    @MinLength(1, { message: 'La empresa debe tener más de 1 caracteres' })
    empresa: string;
}
