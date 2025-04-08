import { Module } from '@nestjs/common';
import { MedicationService } from './medication.service';
import { MedicationController } from './medication.controller';
import { DatabaseModule } from 'src/database/database.module';
import { medicationProviders } from './medication.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...medicationProviders, MedicationService],
  controllers: [MedicationController]
})
export class MedicationsModule { }
