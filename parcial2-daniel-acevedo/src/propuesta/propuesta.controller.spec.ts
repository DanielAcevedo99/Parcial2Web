import { Test, TestingModule } from '@nestjs/testing';
import { PropuestaController } from './propuesta.controller';
import { PropuestaService } from './propuesta.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Propuesta } from './propuesta.entity';
import { Repository } from 'typeorm';

describe('PropuestaController', () => {
  let controller: PropuestaController;
  let service: PropuestaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropuestaController],
      providers: [
        PropuestaService,
        {
          provide: getRepositoryToken(Propuesta),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<PropuestaController>(PropuestaController);
    service = module.get<PropuestaService>(PropuestaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of propuestas', async () => {
      const result = [new Propuesta()];
      jest.spyOn(service, 'findAllPropuestas').mockResolvedValue(result);

      expect(await controller.findAllPropuestas()).toBe(result);
    });
  });

});
