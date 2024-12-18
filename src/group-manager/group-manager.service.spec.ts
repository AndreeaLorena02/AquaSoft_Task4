import { Test, TestingModule } from '@nestjs/testing';
import { GroupManagerService } from './group-manager.service';

describe('GroupManagerService', () => {
  let service: GroupManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupManagerService],
    }).compile();

    service = module.get<GroupManagerService>(GroupManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
