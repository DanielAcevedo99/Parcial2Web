import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proyecto } from './proyecto.entity';

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

  async findProyectoById(id: string): Promise<Proyecto> {
    const proyecto = await this.proyectoRepository.findOne({ where: { idProyecto: id }, relations: ['estudiante', 'propuesta'] });
    if (!proyecto) {
      throw new NotFoundException('Proyecto no encontrado');
    }
    return proyecto;
  }

  async findAllProyectos(): Promise<Proyecto[]> {
    return this.proyectoRepository.find({ relations: ['estudiante', 'propuesta'] });
  }
}
