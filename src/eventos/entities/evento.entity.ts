import { Matrix } from "src/matrices/entities/matrix.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'eventos' })
export class Evento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    evento: string;

    @Column({ nullable: false })
    probabilidad: string;

    @Column({ nullable: false })
    impacto: string;

    @Column({ nullable: false })
    valor: string;

    @Column({ nullable: false })
    nivel_riesgo: string;

    @ManyToOne(() => Matrix, matrix => matrix.id, { eager: true })
    @JoinColumn({ name: 'matrix_id' })
    matrix: Matrix;

    @ManyToOne(() => Usuario, usuario => usuario.id, { eager: true })
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;

    @Column({ default: true })
    estado: boolean;
}
