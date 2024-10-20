import { ApiProperty } from "@nestjs/swagger";

export class GetMatrizValoresDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    probabilidad: JSON;
    @ApiProperty()
    valorprobabilidad: JSON;
    @ApiProperty()
    impacto: JSON;
    @ApiProperty()
    valorimpacto: JSON;
    @ApiProperty()
    matrix: any;
    @ApiProperty()
    estado: boolean;
}