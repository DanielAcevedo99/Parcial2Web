import { Test, TestingModule } from '@nestjs/testing';
import { PropuestaService } from './propuesta.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Propuesta } from './propuesta.entity';
import { Repository } from 'typeorm';

describe('PropuestaService', () => {
  let service: PropuestaService;
  let repository: Repository<Propuesta>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropuestaService,
        {
          provide: getRepositoryToken(Propuesta),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PropuestaService>(PropuestaService);
    repository = module.get<Repository<Propuesta>>(getRepositoryToken(Propuesta));
  });

  describe('crearPropuesta', () => {
    it('debería crear una propuesta exitosamente (caso positivo)', async () => {
      const propuestaData = {
        clave: 'ABC123',
        descripcion: 'Una descripción',
        titulo: 'Un título',
      };

      const propuesta = new Propuesta();
      Object.assign(propuesta, propuestaData);

      jest.spyOn(repository, 'create').mockReturnValue(propuesta);
      jest.spyOn(repository, 'save').mockResolvedValue(propuesta);

      const result = await service.crearPropuesta(propuestaData);
      expect(result).toEqual(propuesta);
      expect(repository.create).toHaveBeenCalledWith(propuestaData);
      expect(repository.save).toHaveBeenCalledWith(propuestaData);
    });

    it('debería lanzar una excepción cuando el título es vacío (caso negativo)', async () => {
      const propuestaData = {
        clave: 'ABC123',
        descripcion: 'Una descripción',
        titulo: '',
      };

      await expect(service.crearPropuesta(propuestaData)).rejects.toThrow(
        'El título no puede estar vacío',
      );
    });
  });

  describe('findPropuestaById', () => {
    it('debería retornar una propuesta cuando el id existe (caso positivo)', async () => {
      const id = 'some-uuid';
      const propuesta = new Propuesta();
      propuesta.idPropuesta = id;

      jest.spyOn(repository, 'findOne').mockResolvedValue(propuesta);

      const result = await service.findPropuestaById(id);
      expect(result).toEqual(propuesta);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { idPropuesta: id } });
    });

    it('debería lanzar una excepción cuando el id no existe (caso negativo)', async () => {
      const id = 'some-uuid';

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findPropuestaById(id)).rejects.toThrow('Propuesta no encontrada');
    });
  });

  describe('findAllPropuestas', () => {
    it('debería retornar una lista de propuestas (caso positivo)', async () => {
      const propuestas = [new Propuesta(), new Propuesta()];

      jest.spyOn(repository, 'find').mockResolvedValue(propuestas);

      const result = await service.findAllPropuestas();
      expect(result).toEqual(propuestas);
      expect(repository.find).toHaveBeenCalledWith({ relations: ['profesor', 'proyecto'] });
    });
  });
});
