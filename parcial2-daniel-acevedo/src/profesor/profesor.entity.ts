import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Propuesta } from '../propuesta/propuesta.entity'

export class Profesor {
    @PrimaryGeneratedColumn('uuid')
    idPRofesor: string;

    @Column()
    numeroCedula: number;

    @Column()
    nombre: string;

    @Column()
    grupoInvestigacion: string;

    @Column()
    numeroExtension: number;

    @OneToMany(() => Propuesta, propuesta => propuesta.profesor)
    propuestas: Propuesta[];
}
