import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Proyecto } from '../proyecto/proyecto.entity';

export class Estudiante {
    @PrimaryGeneratedColumn('uuid')
    idEstudiante: string;

    @Column()
    nombre: string;

    @Column()
    codigoEstudiante: string;

    @Column()
    numeroCreditosAprobados: number;

    @OneToOne(() => Proyecto, proyecto => proyecto.estudiante)
    @JoinColumn()
    proyecto: Proyecto;
}
