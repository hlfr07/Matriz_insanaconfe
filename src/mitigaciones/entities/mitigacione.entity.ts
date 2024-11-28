import { Evento } from "src/eventos/entities/evento.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'mitigaciones' })
export class Mitigacione {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, unique: true})
    pdf: string;

    @Column({nullable: false, unique: true})
    cod: string;

    @ManyToOne(() => Evento, evento => evento.id, { eager: true })
    @JoinColumn({ name: 'evento_id' })
    evento: Evento;

    @Column({nullable: false})
    fecha: string;

    @Column({ default: true })
    estado: boolean;
}
