import { Test, TestingModule } from '@nestjs/testing';
import { OperacionalController } from './operacional.controller';
import { OperacionalService } from './operacional.service';

describe('OperacionalController', () => {
  let controller: OperacionalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OperacionalController],
      providers: [OperacionalService],
    }).compile();

    controller = module.get<OperacionalController>(OperacionalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
