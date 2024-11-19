import { ApiProperty } from "@nestjs/swagger";

export class GetUsuarioDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    nombre: string;
    @ApiProperty()
    apellido: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    usuario: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    perfil: any;
    @ApiProperty()
    empresa: any;
    @ApiProperty()
    estado: boolean;
}