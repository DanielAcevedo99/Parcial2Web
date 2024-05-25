import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectoService } from './proyecto.service';
import { ProyectoController } from './proyecto.controller';
import { Proyecto } from './proyecto.entity';
import { Estudiante } from '../estudiante/estudiante.entity';
import { Propuesta } from '../propuesta/propuesta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proyecto, Estudiante, Propuesta])],
  providers: [ProyectoService],
  controllers: [ProyectoController],
})
export class ProyectoModule {}
