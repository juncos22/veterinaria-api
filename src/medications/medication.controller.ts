import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MedicationService } from './medication.service';
import { Medication } from './medication.entity';
import { CreateMedicationDto } from './medication.dto';

@Controller('medications')
export class MedicationController {
    constructor(private medicationService: MedicationService) { }

    @Get()
    async findAll(@Query('petName') petName?: string) {
        return petName ? await this.medicationService.findAll(petName) : await this.medicationService.getAll();
    }

    @Post()
    async create(@Body() newMedication: CreateMedicationDto) {
        return await this.medicationService.create(newMedication)
    }
}
