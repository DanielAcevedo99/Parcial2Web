import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export class ProyectoEntity {
    @PrimaryGeneratedColumn('uuid')
    idProyecto: string;

    @Column()
    url: string;

    @Column()
    fechaInicio: Date;

    @Column()
    fechaFin: Date;
}
