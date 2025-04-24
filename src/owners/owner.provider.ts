import { DataSource } from 'typeorm';
import { Owner } from './owner.entity';

export const ownerProviders = [
  {
    provide: 'OWNER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Owner),
    inject: ['DATA_SOURCE'],
  },
];
