import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne } from 'typeorm';
import { Estudiante } from '../estudiante/estudiante.entity';
import { Propuesta } from '../propuesta/propuesta.entity';

export class Proyecto {
    @PrimaryGeneratedColumn('uuid')
    idProyecto: string;

    @Column()
    url: string;

    @Column()
    fechaInicio: Date;

    @Column()
    fechaFin: Date;

    @OneToOne(() => Estudiante, estudiante => estudiante.proyecto)
    estudiante: Estudiante;

    @OneToOne(() => Propuesta, propuesta => propuesta.proyecto)
    propuesta: Propuesta;
}
