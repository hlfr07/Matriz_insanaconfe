import { ApiProperty } from "@nestjs/swagger";

export class GetEmpresaDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    empresa: string;
    @ApiProperty()
    estado: string;
}