import { Test, TestingModule } from '@nestjs/testing';
import { OperacionalService } from './operacional.service';

describe('OperacionalService', () => {
  let service: OperacionalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OperacionalService],
    }).compile();

    service = module.get<OperacionalService>(OperacionalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
