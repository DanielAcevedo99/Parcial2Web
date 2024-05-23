import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export class ProfesorEntity {
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
}
