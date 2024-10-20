import { ApiProperty } from "@nestjs/swagger";

export class GetMatrixDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    empresa: string;
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
    usuario: any;
    @ApiProperty()
    estado: boolean;
}