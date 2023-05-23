import { Test, TestingModule } from '@nestjs/testing';
import { PatientHistoryController } from './patient-history.controller';
import { PatientHistoryService } from './patient-history.service';

describe('PatientHistoryController', () => {
  let controller: PatientHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientHistoryController],
      providers: [PatientHistoryService],
    }).compile();

    controller = module.get<PatientHistoryController>(PatientHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
