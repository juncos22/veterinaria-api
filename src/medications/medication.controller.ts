import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { MedicationService } from './medication.service';
import { Medication } from './medication.entity';
import { CreateMedicationDto } from './medication.dto';
import { UserGuard } from 'src/user/user.guard';
import { ResponseDto } from 'src/utils/response.dto';

@Controller('medications')
export class MedicationController {
  constructor(private medicationService: MedicationService) {}

  @UseGuards(UserGuard)
  @Get()
  async findAll(@Query('petName') petName?: string) {
    try {
      const result = petName
        ? await this.medicationService.findAll(petName)
        : await this.medicationService.getAll();
      return new ResponseDto<Medication>(true, '', result);
    } catch (error: any) {
      console.log('ListMedicationsError:', error);
      return new ResponseDto<Medication>(false, error.message);
    }
  }

  @UseGuards(UserGuard)
  @Post()
  async create(@Body() newMedication: CreateMedicationDto) {
    try {
      const result = await this.medicationService.create(newMedication);
      if (result.id)
        return new ResponseDto<CreateMedicationDto>(
          true,
          'Medicación guardada exitosamente!',
        );

      return new ResponseDto<CreateMedicationDto>(
        false,
        'No se pudo guardar la medicación',
      );
    } catch (error: any) {
      console.log('CreateMedicationError:', error);
      return new ResponseDto<CreateMedicationDto>(false, error.message);
    }
  }
}
