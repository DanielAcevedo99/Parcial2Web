import { Test, TestingModule } from '@nestjs/testing';
import { ProyectoService } from './proyecto.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Proyecto } from './proyecto.entity';
import { Repository } from 'typeorm';

describe('ProyectoService', () => {
  let service: ProyectoService;
  let repository: Repository<Proyecto>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProyectoService,
        {
          provide: getRepositoryToken(Proyecto),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProyectoService>(ProyectoService);
    repository = module.get<Repository<Proyecto>>(getRepositoryToken(Proyecto));
  });

  describe('crearProyecto', () => {
    it('debería crear un proyecto exitosamente (caso positivo)', async () => {
      const proyectoData = {
        url: 'http://example.com',
        fechaInicio: new Date('2023-01-01'),
        fechaFin: new Date('2023-12-31'),
      };

      const proyecto = new Proyecto();
      Object.assign(proyecto, proyectoData);

      jest.spyOn(repository, 'create').mockReturnValue(proyecto);
      jest.spyOn(repository, 'save').mockResolvedValue(proyecto);

      const result = await service.crearProyecto(proyectoData);
      expect(result).toEqual(proyecto);
      expect(repository.create).toHaveBeenCalledWith(proyectoData);
      expect(repository.save).toHaveBeenCalledWith(proyectoData);
    });

    it('debería lanzar una excepción cuando la fecha de fin es anterior o igual a la fecha de inicio (caso negativo)', async () => {
      const proyectoData = {
        url: 'http://example.com',
        fechaInicio: new Date('2023-12-31'),
        fechaFin: new Date('2023-01-01'),
      };

      await expect(service.crearProyecto(proyectoData)).rejects.toThrow(
        'La fecha de fin debe ser posterior a la fecha de inicio',
      );
    });
  });

  describe('findProyectoById', () => {
    it('debería retornar un proyecto cuando el id existe (caso positivo)', async () => {
      const id = 'some-uuid';
      const proyecto = new Proyecto();
      proyecto.idProyecto = id;

      jest.spyOn(repository, 'findOne').mockResolvedValue(proyecto);

      const result = await service.findProyectoById(id);
      expect(result).toEqual(proyecto);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { idProyecto: id }, relations: ['estudiante', 'propuesta'] });
    });

    it('debería lanzar una excepción cuando el id no existe (caso negativo)', async () => {
      const id = 'some-uuid';

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findProyectoById(id)).rejects.toThrow('Proyecto no encontrado');
    });
  });

  describe('findAllProyectos', () => {
    it('debería retornar una lista de proyectos (caso positivo)', async () => {
      const proyectos = [new Proyecto(), new Proyecto()];

      jest.spyOn(repository, 'find').mockResolvedValue(proyectos);

      const result = await service.findAllProyectos();
      expect(result).toEqual(proyectos);
      expect(repository.find).toHaveBeenCalledWith({ relations: ['estudiante', 'propuesta'] });
    });
  });
});
