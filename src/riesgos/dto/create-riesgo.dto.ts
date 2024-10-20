import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateRiesgoDto {
    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El valor de_amarillo de la matriz no puede estar vacío' })
    @IsString({ message: 'El valor de_amarillo de la matriz debe ser un texto' })
    @MinLength(1, { message: 'El valor de_amarillo de la matriz debe tener más de 1 caracteres' })
    @MaxLength(10, { message: 'El valor de_amarillo de la matriz debe tener menos de 10 caracteres' })
    de_amarillo: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El valor a_amarillo de la matriz no puede estar vacío' })
    @IsString({ message: 'El valor a_amarillo de la matriz debe ser un texto' })
    @MinLength(1, { message: 'El valor a_amarillo de la matriz debe tener más de 1 caracteres' })
    @MaxLength(10, { message: 'El valor a_amarillo de la matriz debe tener menos de 10 caracteres' })
    a_amarillo: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El valor de_naranja de la matriz no puede estar vacío' })
    @IsString({ message: 'El valor de_naranja de la matriz debe ser un texto' })
    @MinLength(1, { message: 'El valor de_naranja de la matriz debe tener más de 1 caracteres' })
    @MaxLength(10, { message: 'El valor de_naranja de la matriz debe tener menos de 10 caracteres' })
    de_naranja: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El valor a_naranja de la matriz no puede estar vacío' })
    @IsString({ message: 'El valor a_naranja de la matriz debe ser un texto' })
    @MinLength(1, { message: 'El valor a_naranja de la matriz debe tener más de 1 caracteres' })
    @MaxLength(10, { message: 'El valor a_naranja de la matriz debe tener menos de 10 caracteres' })
    a_naranja: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El valor de_rojo de la matriz no puede estar vacío' })
    @IsString({ message: 'El valor de_rojo de la matriz debe ser un texto' })
    @MinLength(1, { message: 'El valor de_rojo de la matriz debe tener más de 1 caracteres' })
    @MaxLength(10, { message: 'El valor de_rojo de la matriz debe tener menos de 10 caracteres' })
    de_rojo: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El valor a_rojo de la matriz no puede estar vacío' })
    @IsString({ message: 'El valor a_rojo de la matriz debe ser un texto' })
    @MinLength(1, { message: 'El valor a_rojo de la matriz debe tener más de 1 caracteres' })
    @MaxLength(10, { message: 'El valor a_rojo de la matriz debe tener menos de 10 caracteres' })
    a_rojo: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El valor de_verde de la matriz no puede estar vacío' })
    @IsString({ message: 'El valor de_verde de la matriz debe ser un texto' })
    @MinLength(1, { message: 'El valor de_verde de la matriz debe tener más de 1 caracteres' })
    @MaxLength(10, { message: 'El valor de_verde de la matriz debe tener menos de 10 caracteres' })
    de_verde: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El valor a_verde de la matriz no puede estar vacío' })
    @IsString({ message: 'El valor a_verde de la matriz debe ser un texto' })
    @MinLength(1, { message: 'El valor a_verde de la matriz debe tener más de 1 caracteres' })
    @MaxLength(10, { message: 'El valor a_verde de la matriz debe tener menos de 10 caracteres' })
    a_verde: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El id_matrix de la matriz no puede estar vacío' })
    @IsString({ message: 'El id_matrix de la matriz debe ser un texto' })
    @MinLength(1, { message: 'El id_matrix de la matriz debe tener más de 1 caracteres' })
    @MaxLength(100, { message: 'El id_matrix de la matriz debe tener menos de 10 caracteres' })
    id_matriz: string;
}
