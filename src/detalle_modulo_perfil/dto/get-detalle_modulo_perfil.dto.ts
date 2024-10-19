import { ApiProperty } from "@nestjs/swagger";

export class GetDetalleModuloPerfilDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    id_detalle_modulo: any;
    @ApiProperty()
    id_detalle_perfil: any;
    @ApiProperty()
    estado: boolean;
}