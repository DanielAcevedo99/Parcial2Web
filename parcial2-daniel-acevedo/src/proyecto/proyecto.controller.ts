import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { Proyecto } from './proyecto.entity';

@Controller('proyectos')
export class ProyectoController {
  constructor(private readonly proyectoService: ProyectoService) {}

  @Post()
  async crearProyecto(@Body() proyectoData: Partial<Proyecto>): Promise<Proyecto> {
    return this.proyectoService.crearProyecto(proyectoData);
  }

  @Get(':id')
  async findProyectoById(@Param('id') id: string): Promise<Proyecto> {
    return this.proyectoService.findProyectoById(id);
  }

  @Get()
  async findAllProyectos(): Promise<Proyecto[]> {
    return this.proyectoService.findAllProyectos();
  }
}
