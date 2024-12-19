import { Test, TestingModule } from '@nestjs/testing';
import { HotelPageService } from './hotel-page.service';

describe('HotelPageService', () => {
  let service: HotelPageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotelPageService],
    }).compile();

    service = module.get<HotelPageService>(HotelPageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
