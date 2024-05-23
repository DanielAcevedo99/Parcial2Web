import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proyecto } from './proyecto.entity';
import { Estudiante } from '../estudiante/estudiante.entity';
import { Propuesta } from '../propuesta/propuesta.entity';

@Injectable()
export class ProyectoService {
  constructor(
    @InjectRepository(Proyecto)
    private proyectoRepository: Repository<Proyecto>,
  ) {}

  async crearProyecto(proyectoData: Partial<Proyecto>): Promise<Proyecto> {
    if (new Date(proyectoData.fechaFin) <= new Date(proyectoData.fechaInicio)) {
      throw new BadRequestException('La fecha de fin debe ser posterior a la fecha de inicio');
    }
    const proyecto = this.proyectoRepository.create(proyectoData);
    return this.proyectoRepository.save(proyecto);
  }
}
