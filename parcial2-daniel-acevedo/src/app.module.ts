import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ProfesorModule } from './profesor/profesor.module';
import { PropuestaModule } from './propuesta/propuesta.module';
import { ProyectoModule } from './proyecto/proyecto.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'daniel',  
      password: 'uniandes',  
      database: 'proyecto',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    EstudianteModule,
    ProfesorModule,
    PropuestaModule,
    ProyectoModule,
  ],
})
export class AppModule {}
