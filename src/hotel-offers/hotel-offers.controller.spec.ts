import { Test, TestingModule } from '@nestjs/testing';
import { HotelOffersController } from './hotel-offers.controller';

describe('HotelOffersController', () => {
  let controller: HotelOffersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HotelOffersController],
    }).compile();

    controller = module.get<HotelOffersController>(HotelOffersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
