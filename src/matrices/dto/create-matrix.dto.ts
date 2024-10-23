import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, Max, MaxLength, MinLength } from "class-validator";

export class CreateMatrixDto {
    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'La empresa no puede estar vacía' })
    @IsString({ message: 'La empresa debe ser un texto' })
    @MaxLength(50, { message: 'La empresa debe tener menos de 50 caracteres' })
    @MinLength(3, { message: 'La empresa debe tener más de 3 caracteres' })
    empresa: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    @IsString({ message: 'El nombre debe ser un texto' })
    @MaxLength(50, { message: 'El nombre debe tener menos de 50 caracteres' })
    @MinLength(3, { message: 'El nombre debe tener más de 3 caracteres' })
    nombre: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'Las filas no pueden estar vacías' })
    @IsString({ message: 'Las filas deben ser un texto' })
    @MaxLength(50, { message: 'Las filas deben tener menos de 50 caracteres' })
    @MinLength(1, { message: 'Las filas deben tener más de 3 caracteres' })
    filas: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'Las columnas no pueden estar vacías' })
    @IsString({ message: 'Las columnas deben ser un texto' })
    @MaxLength(50, { message: 'Las columnas deben tener menos de 50 caracteres' })
    @MinLength(1, { message: 'Las columnas deben tener más de 3 caracteres' })
    columnas: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'La fecha no puede estar vacía' })
    @IsString({ message: 'La fecha debe ser un texto' })
    @MaxLength(50, { message: 'La fecha debe tener menos de 50 caracteres' })
    @MinLength(3, { message: 'La fecha debe tener más de 3 caracteres' })
    fecha: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'La hora no puede estar vacía' })
    @IsString({ message: 'La hora debe ser un texto' })
    @MaxLength(50, { message: 'La hora debe tener menos de 50 caracteres' })
    @MinLength(3, { message: 'La hora debe tener más de 3 caracteres' })
    hora: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El usuario no puede estar vacío' })
    @IsString({ message: 'El usuario debe ser un texto' })
    @MaxLength(100, { message: 'El usuario debe tener menos de 100 caracteres' })
    @MinLength(1, { message: 'El usuario debe tener más de 1 caracteres' })
    id_usuario: string;
}
