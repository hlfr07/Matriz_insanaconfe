import { ApiProperty } from "@nestjs/swagger";

export class GetRiesgoDto {
    @ApiProperty()
    de_amarillo: number;
    @ApiProperty()
    a_amarillo: number;
    @ApiProperty()
    de_naranja: number;
    @ApiProperty()
    a_naranja: number;
    @ApiProperty()
    de_rojo: number;
    @ApiProperty()
    a_rojo: number;
    @ApiProperty()
    de_verde: number;
    @ApiProperty()
    a_verde: number;
    @ApiProperty()
    matrix: any;
    @ApiProperty()
    estado: boolean;
}