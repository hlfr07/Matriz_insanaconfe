import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUsuarioDto {
    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El dni de usuario no puede estar vacío' })
    @IsString({ message: 'El dni de usuario debe ser un texto' })
    @MaxLength(50, { message: 'El dni de usuario debe tener menos de 50 caracteres' })
    @MinLength(3, { message: 'El dni de usuario debe tener más de 3 caracteres' })
    dni: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El nombre de usuario no puede estar vacío' })
    @IsString({ message: 'El nombre de usuario debe ser un texto' })
    @MaxLength(50, { message: 'El nombre de usuario debe tener menos de 50 caracteres' })
    @MinLength(3, { message: 'El nombre de usuario debe tener más de 3 caracteres' })
    nombre: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El apellido de usuario no puede estar vacío' })
    @IsString({ message: 'El apellido de usuario debe ser un texto' })
    @MaxLength(50, { message: 'El apellido de usuario debe tener menos de 50 caracteres' })
    @MinLength(3, { message: 'El apellido de usuario debe tener más de 3 caracteres' })
    apellido: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El email de usuario no puede estar vacío' })
    @IsString({ message: 'El email de usuario debe ser un texto' })
    @MaxLength(50, { message: 'El email de usuario debe tener menos de 50 caracteres' })
    @MinLength(3, { message: 'El email de usuario debe tener más de 3 caracteres' })
    email: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El usuario no puede estar vacío' })
    @IsString({ message: 'El usuario debe ser un texto' })
    @MaxLength(50, { message: 'El usuario debe tener menos de 50 caracteres' })
    @MinLength(3, { message: 'El usuario debe tener más de 3 caracteres' })
    usuario: string;

    //ahora para el id_perfil
    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El perfil de usuario no puede estar vacío' })
    @IsString({ message: 'El perfil de usuario debe ser un texto' })
    @MaxLength(100, { message: 'El perfil de usuario debe tener menos de 100 caracteres' })
    @MinLength(1, { message: 'El perfil de usuario debe tener más de 1 caracteres' })
    id_perfil: string;

    //ahora para el id_empresa
    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'La empresa de usuario no puede estar vacío' })
    @IsString({ message: 'La empresa de usuario debe ser un texto' })
    @MaxLength(100, { message: 'La empresa de usuario debe tener menos de 100 caracteres' })
    @MinLength(1, { message: 'La empresa de usuario debe tener más de 1 caracteres' })
    id_empresa: string;
    
}
