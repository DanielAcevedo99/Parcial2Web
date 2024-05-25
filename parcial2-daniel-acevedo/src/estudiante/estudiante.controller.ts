import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { Estudiante } from './estudiante.entity';

@Controller('estudiantes')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post()
  async crearEstudiante(@Body() estudianteData: Partial<Estudiante>): Promise<Estudiante> {
    return this.estudianteService.crearEstudiante(estudianteData);
  }

  @Get(':id')
  async findEstudianteById(@Param('id') id: string): Promise<Estudiante> {
    return this.estudianteService.findEstudianteById(id);
  }
}
