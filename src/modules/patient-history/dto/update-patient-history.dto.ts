import { PartialType } from '@nestjs/swagger';
import { CreatePatientHistoryDto } from './create-patient-history.dto';

export class UpdatePatientHistoryDto extends PartialType(
  CreatePatientHistoryDto,
) {}
