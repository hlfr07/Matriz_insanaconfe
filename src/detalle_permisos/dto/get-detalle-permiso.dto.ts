import { ApiProperty } from "@nestjs/swagger";
import { Modulo } from "src/modulos/entities/modulo.entity";
import { Perfile } from "src/perfiles/entities/perfile.entity";
import { Tabla } from "src/tablas/entities/tabla.entity";

export class GetDetallePermisoDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    modulo: Modulo;
    @ApiProperty()
    tabla: Tabla;
    @ApiProperty()
    perfil: Perfile;
    @ApiProperty()
    get: boolean;
    @ApiProperty()
    post: boolean;
    @ApiProperty()
    put: boolean;
    @ApiProperty()
    delete: boolean;
    @ApiProperty()
    estado: boolean;
}