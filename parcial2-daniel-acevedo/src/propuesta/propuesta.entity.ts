import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Profesor } from '../profesor/profesor.entity';
import { Proyecto } from '../proyecto/proyecto.entity';

export class Propuesta {
    @PrimaryGeneratedColumn('uuid')
    idPropuesta: string;

    @Column()
    clave: string;

    @Column()
    descripcion: string;

    @Column()
    titulo: string;

    @ManyToOne(() => Profesor, profesor => profesor.propuestas)
    profesor: Profesor;

    @OneToOne(() => Proyecto, proyecto => proyecto.propuesta)
    @JoinColumn()
    proyecto: Proyecto;
}
