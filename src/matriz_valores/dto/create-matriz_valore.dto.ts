import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsNotEmpty, IsObject, IsString, Max, MaxLength, Min, MinLength } from "class-validator";
import { isEmpty } from "rxjs";

export class CreateMatrizValoreDto {
    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El valor de probabilidad de la matriz no puede estar vacío' })
    @IsArray({ message: 'El valor de probabilidad de la matriz debe ser un arreglo' })
    probabilidad: Record<string, any>[];

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El valor de probabilidad de la matriz no puede estar vacío' })
    @IsArray({ message: 'El valor de probabilidad de la matriz debe ser un arreglo' })
    valorprobabilidad: Record<string, any>[];   

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El valor de impacto de la matriz no puede estar vacío' })
    @IsArray({ message: 'El valor de impacto de la matriz debe ser un arreglo' })
    impacto: Record<string, any>[];

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El valor de impacto de la matriz no puede estar vacío' })
    @IsArray({ message: 'El valor de impacto de la matriz debe ser un arreglo' })
    valorimpacto: Record<string, any>[];

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El valor de matriz no puede estar vacío' })
    @IsString({ message: 'El valor de matriz debe ser un texto' })
    @MinLength(1, { message: 'El valor de matriz debe tener más de 1 caracteres' })
    @MaxLength(100, { message: 'El valor de matriz debe tener menos de 100 caracteres' })
    id_matriz: string;
}
