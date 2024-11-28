import { ApiProperty } from "@nestjs/swagger";

export default class GetMitigacioneDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    pdf: string;
    @ApiProperty()
    cod: string;
    @ApiProperty()
    evento: any;
    @ApiProperty()
    fecha: string;
    @ApiProperty()
    estado: boolean;
}