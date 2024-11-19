import { ApiProperty } from "@nestjs/swagger";

export class GetMatrixDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    nombre: string;
    @ApiProperty()
    filas: number;
    @ApiProperty()
    columnas: number;
    @ApiProperty()
    fecha: Date;
    @ApiProperty()
    hora: string;
    @ApiProperty()
    empresa: any;
    @ApiProperty()
    estado: boolean;
}