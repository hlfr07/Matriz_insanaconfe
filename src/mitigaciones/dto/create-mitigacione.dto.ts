import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateMitigacioneDto {

    @ApiProperty({
        type: 'string',
        format: 'binary',
        description: 'Archivo comprimido (zip/rar) que se subirá como evidencia'
    })
    file?: any; // No se valida aquí porque lo maneja `multer`

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El evento no puede estar vacío' })
    @IsString({ message: 'El evento debe ser un texto' })
    @MaxLength(200, { message: 'El evento debe tener menos de 200 caracteres' })
    @MinLength(3, { message: 'El evento debe tener más de 3 caracteres' })
    cod: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'El evento no puede estar vacío' })
    @IsString({ message: 'El evento debe ser un texto' })
    @MaxLength(100, { message: 'El evento debe tener menos de 1 caracteres' })
    @MinLength(1, { message: 'El evento debe tener más de 1 caracteres' })
    evento_id: string;
}
