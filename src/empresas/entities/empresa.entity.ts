import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'empresas' })
export class Empresa {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false })
    empresa: string;

    @Column({ nullable: true })
    estado: boolean;

}
