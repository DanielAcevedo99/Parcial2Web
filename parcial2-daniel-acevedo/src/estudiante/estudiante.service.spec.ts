import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteService } from './estudiante.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Estudiante } from './estudiante.entity';
import { Repository } from 'typeorm';

describe('EstudianteService', () => {
  let service: EstudianteService;
  let repository: Repository<Estudiante>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstudianteService,
        {
          provide: getRepositoryToken(Estudiante),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
    repository = module.get<Repository<Estudiante>>(getRepositoryToken(Estudiante));
  });

  describe('crearEstudiante', () => {
    it('debería crear un estudiante exitosamente (caso positivo)', async () => {
      const estudianteData = {
        nombre: 'John Doe',
        codigoEstudiante: '1234567890',
        numeroCreditosAprobados: 30,
      };

      const estudiante = new Estudiante();
      Object.assign(estudiante, estudianteData);

      jest.spyOn(repository, 'create').mockReturnValue(estudiante);
      jest.spyOn(repository, 'save').mockResolvedValue(estudiante);

      const result = await service.crearEstudiante(estudianteData);
      expect(result).toEqual(estudiante);
      expect(repository.create).toHaveBeenCalledWith(estudianteData);
      expect(repository.save).toHaveBeenCalledWith(estudianteData);
    });

    it('debería lanzar una excepción cuando el código de estudiante no tiene 10 caracteres (caso negativo)', async () => {
      const estudianteData = {
        nombre: 'John Doe',
        codigoEstudiante: '123456789',
        numeroCreditosAprobados: 30,
      };

      await expect(service.crearEstudiante(estudianteData)).rejects.toThrow(
        'El código de estudiante debe tener 10 caracteres',
      );
    });
  });

  describe('findEstudianteById', () => {
    it('debería retornar un estudiante cuando el id existe (caso positivo)', async () => {
      const id = 'some-uuid';
      const estudiante = new Estudiante();
      estudiante.idEstudiante = id;

      jest.spyOn(repository, 'findOne').mockResolvedValue(estudiante);

      const result = await service.findEstudianteById(id);
      expect(result).toEqual(estudiante);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { idEstudiante: id } });
    });

    it('debería lanzar una excepción cuando el id no existe (caso negativo)', async () => {
      const id = 'some-uuid';

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findEstudianteById(id)).rejects.toThrow('Estudiante no encontrado');
    });
  });
});
