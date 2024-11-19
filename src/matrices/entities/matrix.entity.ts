import { Empresa } from "src/empresas/entities/empresa.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'matrices' })
export class Matrix {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    nombre: string;

    @Column({ nullable: false })
    filas: number;

    @Column({ nullable: false })
    columnas: number;

    @Column({ nullable: false })
    fecha: Date;

    @Column({ nullable: false, type: 'time' })
    hora: string;

    @ManyToOne(() => Empresa, empresa => empresa.id, { eager: true })
    @JoinColumn({ name: 'id_empresa' })
    empresa: Empresa;

    @Column({ default: true })
    estado: boolean;
}
