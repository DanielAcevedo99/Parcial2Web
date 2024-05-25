import { Test, TestingModule } from '@nestjs/testing';
import { ProfesorService } from './profesor.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Profesor } from './profesor.entity';
import { Propuesta } from '../propuesta/propuesta.entity';
import { Proyecto } from '../proyecto/proyecto.entity';
import { Repository } from 'typeorm';

describe('ProfesorService', () => {
  let service: ProfesorService;
  let profesorRepository: Repository<Profesor>;
  let propuestaRepository: Repository<Propuesta>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfesorService,
        {
          provide: getRepositoryToken(Profesor),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Propuesta),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProfesorService>(ProfesorService);
    profesorRepository = module.get<Repository<Profesor>>(getRepositoryToken(Profesor));
    propuestaRepository = module.get<Repository<Propuesta>>(getRepositoryToken(Propuesta));
  });

  describe('crearProfesor', () => {
    it('debería crear un profesor exitosamente (caso positivo)', async () => {
      const profesorData = {
        numeroCedula: 12345678,
        nombre: 'John Doe',
        grupoInvestigacion: 'TICSW',
        numeroExtension: 1234,
      };

      const profesor = new Profesor();
      Object.assign(profesor, profesorData);

      jest.spyOn(profesorRepository, 'create').mockReturnValue(profesor);
      jest.spyOn(profesorRepository, 'save').mockResolvedValue(profesor);

      const result = await service.crearProfesor(profesorData);
      expect(result).toEqual(profesor);
      expect(profesorRepository.create).toHaveBeenCalledWith(profesorData);
      expect(profesorRepository.save).toHaveBeenCalledWith(profesorData);
    });

    it('debería lanzar una excepción cuando el grupo de investigación no es válido (caso negativo)', async () => {
      const profesorData = {
        numeroCedula: 12345678,
        nombre: 'John Doe',
        grupoInvestigacion: 'INVALID',
        numeroExtension: 1234,
      };

      await expect(service.crearProfesor(profesorData)).rejects.toThrow(
        'El grupo de investigación no es válido',
      );
    });
  });

  describe('findProfesorById', () => {
    it('debería retornar un profesor cuando el id existe (caso positivo)', async () => {
      const id = 'some-uuid';
      const profesor = new Profesor();
      profesor.idProfesor = id;

      jest.spyOn(profesorRepository, 'findOne').mockResolvedValue(profesor);

      const result = await service.findProfesorById(id);
      expect(result).toEqual(profesor);
      expect(profesorRepository.findOne).toHaveBeenCalledWith({ where: { idProfesor: id } });
    });

    it('debería lanzar una excepción cuando el id no existe (caso negativo)', async () => {
      const id = 'some-uuid';

      jest.spyOn(profesorRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findProfesorById(id)).rejects.toThrow('Profesor no encontrado');
    });
  });

  describe('eliminarProfesor', () => {
    it('debería eliminar un profesor exitosamente cuando no tiene propuestas asociadas a un proyecto (caso positivo)', async () => {
      const id = 'some-uuid';
      const profesor = new Profesor();
      profesor.idProfesor = id;

      jest.spyOn(profesorRepository, 'findOne').mockResolvedValue(profesor);
      jest.spyOn(propuestaRepository, 'find').mockResolvedValue([]);

      jest.spyOn(profesorRepository, 'remove').mockResolvedValue(profesor);

      await service.eliminarProfesor(id);
      expect(profesorRepository.remove).toHaveBeenCalledWith(profesor);
    });

    it('debería lanzar una excepción cuando el profesor tiene propuestas asociadas a un proyecto (caso negativo)', async () => {
      const id = 'some-uuid';
      const profesor = new Profesor();
      profesor.idProfesor = id;
      const propuesta = new Propuesta();
      propuesta.proyecto = new Proyecto(); // Crear una instancia válida de Proyecto

      jest.spyOn(profesorRepository, 'findOne').mockResolvedValue(profesor);
      jest.spyOn(propuestaRepository, 'find').mockResolvedValue([propuesta]);

      await expect(service.eliminarProfesor(id)).rejects.toThrow(
        'No se puede eliminar un profesor con propuestas asociadas a un proyecto',
      );
    });
  });
});
