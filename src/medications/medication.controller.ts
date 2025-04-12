import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { MedicationService } from './medication.service';
import { Medication } from './medication.entity';
import { CreateMedicationDto } from './medication.dto';
import { UserGuard } from 'src/user/user.guard';

@Controller('medications')
export class MedicationController {
    constructor(private medicationService: MedicationService) { }

    @UseGuards(UserGuard)
    @Get()
    async findAll(@Query('petName') petName?: string) {
        return petName ? await this.medicationService.findAll(petName) : await this.medicationService.getAll();
    }

    @UseGuards(UserGuard)
    @Post()
    async create(@Body() newMedication: CreateMedicationDto) {
        return await this.medicationService.create(newMedication)
    }
}
