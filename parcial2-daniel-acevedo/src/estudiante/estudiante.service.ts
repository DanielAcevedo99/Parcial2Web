import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from './estudiante.entity';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(Estudiante)
    private estudianteRepository: Repository<Estudiante>,
  ) {}

  async crearEstudiante(estudianteData: Partial<Estudiante>): Promise<Estudiante> {
    if (!estudianteData.codigoEstudiante || estudianteData.codigoEstudiante.length !== 10) {
      throw new BadRequestException('El código de estudiante debe tener 10 caracteres');
    }
    const estudiante = this.estudianteRepository.create(estudianteData);
    return this.estudianteRepository.save(estudiante);
  }

  async findEstudianteById(id: string): Promise<Estudiante> {
    const estudiante = await this.estudianteRepository.findOne({ where: { idEstudiante: id } });
    if (!estudiante) {
      throw new NotFoundException('Estudiante no encontrado');
    }
    return estudiante;
  }
}
