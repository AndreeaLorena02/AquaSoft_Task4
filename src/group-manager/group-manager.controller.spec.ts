import { Test, TestingModule } from '@nestjs/testing';
import { GroupManagerController } from './group-manager.controller';

describe('GroupManagerController', () => {
  let controller: GroupManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupManagerController],
    }).compile();

    controller = module.get<GroupManagerController>(GroupManagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
