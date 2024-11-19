import { Empresa } from "src/empresas/entities/empresa.entity";
import { Perfile } from "src/perfiles/entities/perfile.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "usuarios" })
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ unique: true, nullable: false })
    dni: string;
    @Column({ nullable: false })
    nombre: string;
    @Column({ nullable: false })
    apellido: string;
    @Column({ unique: true, nullable: false })
    email: string;
    @Column({ unique: true, nullable: false })
    usuario: string;
    @Column({ nullable: false })
    password: string;
    //aca ponemos el fk id_perfil
    @ManyToOne(() => Perfile, perfil => perfil.id, { eager: true })
    @JoinColumn({ name: 'id_perfil' })
    perfil: Perfile;
    @ManyToOne(() => Empresa, empresa => empresa.id, { eager: true })
    @JoinColumn({ name: 'id_empresa' })
    empresa: Empresa;
    @Column({ default: true })
    estado: boolean;
    @Column({ nullable: true })
    resetCode: string;
    @Column({ type: 'timestamp', nullable: true })
    resetCodeExpiration: Date;
}
