import { Matrix } from "src/matrices/entities/matrix.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'matriz_valores' })
export class MatrizValore {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'json', nullable: false })
    probabilidad: Record<string, any>[];

    @Column({ type: 'json', nullable: false })
    valorprobabilidad: Record<string, any>[];

    @Column({ type: 'json', nullable: false })
    impacto: Record<string, any>[];

    @Column({ type: 'json', nullable: false })
    valorimpacto: Record<string, any>[];

    @ManyToOne(() => Matrix, matrix => matrix.id, { eager: true })
    @JoinColumn({ name: 'matriz_id' })
    matrix: Matrix;

    @Column({ default: true })
    estado: boolean;
}
