import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { Profesor } from './profesor.entity';

@Controller('profesores')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Post()
  async crearProfesor(@Body() profesorData: Partial<Profesor>): Promise<Profesor> {
    return this.profesorService.crearProfesor(profesorData);
  }

  @Get(':id')
  async findProfesorById(@Param('id') id: string): Promise<Profesor> {
    return this.profesorService.findProfesorById(id);
  }

  @Delete(':id')
  async eliminarProfesor(@Param('id') id: string): Promise<void> {
    return this.profesorService.eliminarProfesor(id);
  }

  @Delete('cedula/:cedula')
  async eliminarProfesorPorCedula(@Param('cedula') numeroCedula: number): Promise<void> {
    return this.profesorService.eliminarProfesorPorCedula(numeroCedula);
  }
}
