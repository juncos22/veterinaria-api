import { Inject, Injectable } from '@nestjs/common';
import { Medication } from './medication.entity';
import { Repository } from 'typeorm';
import { CreateMedicationDto } from './medication.dto';

@Injectable()
export class MedicationService {
    constructor(@Inject('MEDICATION_REPOSITORY') private medicationRepository: Repository<Medication>) { }

    create(newMedication: CreateMedicationDto) {
        return this.medicationRepository.save({
            name: newMedication.name,
            pet: {
                id: newMedication.petId
            }
        })
    }

    findAll(petName: string) {
        return this.medicationRepository.find({ where: { pet: { name: petName } } })
    }

    getAll() {
        return this.medicationRepository.find();
    }
}
