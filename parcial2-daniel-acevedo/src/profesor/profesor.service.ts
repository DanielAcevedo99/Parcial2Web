import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profesor } from './profesor.entity';
import { Propuesta } from '../propuesta/propuesta.entity';

@Injectable()
export class ProfesorService {
  constructor(
    @InjectRepository(Profesor)
    private profesorRepository: Repository<Profesor>,
    @InjectRepository(Propuesta)
    private propuestaRepository: Repository<Propuesta>,
  ) {}

  private validGroups = ['TICSW', 'IMAGINE', 'COMIT'];

  async crearProfesor(profesorData: Partial<Profesor>): Promise<Profesor> {
    if (!this.validGroups.includes(profesorData.grupoInvestigacion)) {
      throw new BadRequestException('El grupo de investigación no es válido');
    }
    const profesor = this.profesorRepository.create(profesorData);
    return this.profesorRepository.save(profesor);
  }

  async findProfesorById(id: string): Promise<Profesor> {
    const profesor = await this.profesorRepository.findOne({ where: { idProfesor: id } });
    if (!profesor) {
      throw new NotFoundException('Profesor no encontrado');
    }
    return profesor;
  }

  async eliminarProfesor(id: string): Promise<void> {
    const profesor = await this.findProfesorById(id);
    const propuestas = await this.propuestaRepository.find({ where: { profesor } });

    for (const propuesta of propuestas) {
      if (propuesta.proyecto) {
        throw new BadRequestException('No se puede eliminar un profesor con propuestas asociadas a un proyecto');
      }
    }

    await this.profesorRepository.remove(profesor);
  }

  async eliminarProfesorPorCedula(numeroCedula: number): Promise<void> {
    const profesor = await this.profesorRepository.findOne({ where: { numeroCedula } });
    if (!profesor) {
      throw new NotFoundException('Profesor no encontrado');
    }

    const propuestas = await this.propuestaRepository.find({ where: { profesor } });

    for (const propuesta of propuestas) {
      if (propuesta.proyecto) {
        throw new BadRequestException('No se puede eliminar un profesor con propuestas asociadas a un proyecto');
      }
    }

    await this.profesorRepository.remove(profesor);
  }
}
