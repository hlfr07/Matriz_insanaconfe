import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateEventoDto {
    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El evento no puede estar vacío' })
    @IsString({ message: 'El evento debe ser un texto' })
    @MaxLength(200, { message: 'El evento debe tener menos de 200 caracteres' })
    @MinLength(3, { message: 'El evento debe tener más de 3 caracteres' })
    evento: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'La probabilidad no puede estar vacía' })
    @IsString({ message: 'La probabilidad debe ser un texto' })
    @MaxLength(50, { message: 'La probabilidad debe tener menos de 50 caracteres' })
    @MinLength(1, { message: 'La probabilidad debe tener más de 1 caracteres' })
    probabilidad: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El impacto no puede estar vacío' })
    @IsString({ message: 'El impacto debe ser un texto' })
    @MaxLength(50, { message: 'El impacto debe tener menos de 50 caracteres' })
    @MinLength(1, { message: 'El impacto debe tener más de 1 caracteres' })
    impacto: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El valor no puede estar vacío' })
    @IsString({ message: 'El valor debe ser un texto' })
    @MaxLength(50, { message: 'El valor debe tener menos de 50 caracteres' })
    @MinLength(1, { message: 'El valor debe tener más de 1 caracteres' })
    valor: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El nivel de riesgo no puede estar vacío' })
    @IsString({ message: 'El nivel de riesgo debe ser un texto' })
    @MaxLength(50, { message: 'El nivel de riesgo debe tener menos de 50 caracteres' })
    @MinLength(1, { message: 'El nivel de riesgo debe tener más de 1 caracteres' })
    nivel_riesgo: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El estado no puede estar vacío' })
    @IsString({ message: 'El estado debe ser un texto' })
    @MaxLength(100, { message: 'El estado debe tener menos de 100 caracteres' })
    @MinLength(1, { message: 'El estado debe tener más de 1 caracteres' })
    matrix_id: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El usuario no puede estar vacío' })
    @IsString({ message: 'El usuario debe ser un texto' })
    @MaxLength(100, { message: 'El usuario debe tener menos de 100 caracteres' })
    @MinLength(1, { message: 'El usuario debe tener más de 1 caracteres' })
    usuario_id: string;
}
