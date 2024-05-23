import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export class EstudianteEntity {
    @PrimaryGeneratedColumn('uuid')
    idEstudiante: string;

    @Column()
    nombre: string;

    @Column()
    codigoEstudiante: string;

    @Column()
    numeroCreditosAprobados: number;
}
