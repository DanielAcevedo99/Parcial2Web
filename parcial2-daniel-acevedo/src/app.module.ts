import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProyectoModule } from './proyecto/proyecto.module';
import { ProfesorModule } from './profesor/profesor.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { PropuestaModule } from './propuesta/propuesta.module';
import { Proyecto } from './proyecto/proyecto.entity';
import { Profesor } from './profesor/profesor.entity';
import { Estudiante } from './estudiante/estudiante.entity';
import { Propuesta } from './propuesta/propuesta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ProyectoModule, ProfesorModule, EstudianteModule, ProfesorModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'museum',
      entities: [Proyecto, Profesor, Estudiante, Propuesta],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }),
    EstudianteModule,
    ProfesorModule,
    PropuestaModule,
    ProyectoModule,,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}