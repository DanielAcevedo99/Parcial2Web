import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesorService } from './profesor.service';
import { Profesor } from './profesor.entity';
import { Propuesta } from '../propuesta/propuesta.entity';
import { ProfesorController } from './profesor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Profesor, Propuesta])],
  providers: [ProfesorService],
  controllers: [ProfesorController],
})
export class ProfesorModule {}
