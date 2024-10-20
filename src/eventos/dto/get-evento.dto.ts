import { ApiProperty } from "@nestjs/swagger";

export class GetEventoDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    evento: string;
    @ApiProperty()
    probabilidad: string;
    @ApiProperty()
    impacto: string;
    @ApiProperty()
    valor: string;
    @ApiProperty()
    nivel_riesgo: string;
    @ApiProperty()
    matrix: any;
    @ApiProperty()
    estado: boolean;
}