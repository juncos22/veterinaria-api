
import { DataSource } from 'typeorm';
import { Medication } from './medication.entity';

export const medicationProviders = [
    {
        provide: 'MEDICATION_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Medication),
        inject: ['DATA_SOURCE'],
    },
];