import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteService } from './estudiante.service';
import { EstudianteController } from './estudiante.controller';
import { Estudiante } from './estudiante.entity';
import { Proyecto } from '../proyecto/proyecto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estudiante, Proyecto])],
  providers: [EstudianteService],
  controllers: [EstudianteController],
})
export class EstudianteModule {}
