import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export class PropuestaEntity {
    @PrimaryGeneratedColumn('uuid')
    idPropuesta: string;

    @Column()
    clave: string;

    @Column()
    descripcion: string;

    @Column()
    titulo: string;
}
