
import { DataSource } from 'typeorm';
import { Breed } from '../entities/breed.entity';

export const breedProviders = [
    {
        provide: 'BREED_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Breed),
        inject: ['DATA_SOURCE'],
    },
];