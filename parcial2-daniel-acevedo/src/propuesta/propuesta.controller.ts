import { Controller, Get } from '@nestjs/common';
import { PropuestaService } from './propuesta.service';
import { Propuesta } from './propuesta.entity';

@Controller('propuestas')
export class PropuestaController {
  constructor(private readonly propuestaService: PropuestaService) {}

  @Get()
  async findAllPropuestas(): Promise<Propuesta[]> {
    return this.propuestaService.findAllPropuestas();
  }
}
