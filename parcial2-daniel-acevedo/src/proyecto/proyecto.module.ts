import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectoService } from './proyecto.service';
import { Proyecto } from './proyecto.entity';
import { Estudiante } from '../estudiante/estudiante.entity';
import { Propuesta } from '../propuesta/propuesta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proyecto, Estudiante, Propuesta])],
  providers: [ProyectoService],
})
export class ProyectoModule {}
