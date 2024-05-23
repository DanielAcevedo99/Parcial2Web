import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Propuesta } from './propuesta.entity';
import { Profesor } from '../profesor/profesor.entity';

@Injectable()
export class PropuestaService {
  constructor(
    @InjectRepository(Propuesta)
    private propuestaRepository: Repository<Propuesta>,
  ) {}

  async crearPropuesta(propuestaData: Partial<Propuesta>): Promise<Propuesta> {
    if (!propuestaData.titulo || propuestaData.titulo.trim() === '') {
      throw new BadRequestException('El título no puede estar vacío');
    }
    const propuesta = this.propuestaRepository.create(propuestaData);
    return this.propuestaRepository.save(propuesta);
  }

  async findPropuestaById(id: string): Promise<Propuesta> {
    const propuesta = await this.propuestaRepository.findOne({ where: { idPropuesta: id } });
    if (!propuesta) {
      throw new NotFoundException('Propuesta no encontrada');
    }
    return propuesta;
  }

  async findAllPropuestas(): Promise<Propuesta[]> {
    return this.propuestaRepository.find({ relations: ['profesor', 'proyecto'] });
  }

  async deletePropuesta(id: string): Promise<void> {
    const propuesta = await this.findPropuestaById(id);

    if (propuesta.proyecto) {
      throw new BadRequestException('No se puede eliminar una propuesta que tiene un proyecto asociado');
    }

    await this.propuestaRepository.remove(propuesta);
  }
}
