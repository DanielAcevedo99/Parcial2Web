import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfesorModule } from './profesor/profesor.module';
import { EstudianteModule } from './estudiante/estudiante.module';

@Module({
  imports: [ProfesorModule, EstudianteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
