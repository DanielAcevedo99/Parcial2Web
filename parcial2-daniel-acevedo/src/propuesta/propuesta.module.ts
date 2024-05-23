import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropuestaService } from './propuesta.service';
import { Propuesta } from './propuesta.entity';
import { Profesor } from '../profesor/profesor.entity';
import { Proyecto } from '../proyecto/proyecto.entity';
import { PropuestaController } from './propuesta.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Propuesta, Profesor, Proyecto])],
  providers: [PropuestaService],
  controllers: [PropuestaController],
})
export class PropuestaModule {}
