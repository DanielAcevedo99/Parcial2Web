import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteService } from './estudiante.service';
import { Estudiante } from './estudiante.entity';
import { Proyecto } from '../proyecto/proyecto.entity';
import { EstudianteController } from './estudiante.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Estudiante, Proyecto])],
  providers: [EstudianteService],
  controllers: [EstudianteController],
})
export class EstudianteModule {}
