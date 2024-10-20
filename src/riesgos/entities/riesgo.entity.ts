import { Matrix } from "src/matrices/entities/matrix.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'riesgos' })
export class Riesgo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    de_amarillo: number;

    @Column({ nullable: false })
    a_amarillo: number;

    @Column({ nullable: false })
    de_naranja: number;

    @Column({ nullable: false })
    a_naranja: number;

    @Column({ nullable: false })
    de_rojo: number;

    @Column({ nullable: false })
    a_rojo: number;

    @Column({ nullable: false })
    de_verde: number;

    @Column({ nullable: false })
    a_verde: number;

    @ManyToOne(() => Matrix, matrix => matrix.id, {eager: true})
    @JoinColumn({ name: 'id_matrix' })
    matrix: Matrix;

    @Column({ default: true })
    estado: boolean;

}
