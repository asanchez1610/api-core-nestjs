import { Test, TestingModule } from '@nestjs/testing';
import { ConfigEnvService } from './configenv.service';

describe('ConfigEnvService', () => {
  let service: ConfigEnvService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigEnvService],
    }).compile();

    service = module.get<ConfigEnvService>(ConfigEnvService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
