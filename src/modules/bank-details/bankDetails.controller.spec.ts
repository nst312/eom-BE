import { Test, TestingModule } from '@nestjs/testing';
import { BankDetailsController } from './bankDetails.controller';

describe('BankDetailsController', () => {
  let controller: BankDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankDetailsController],
    }).compile();

    controller = module.get<BankDetailsController>(BankDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
