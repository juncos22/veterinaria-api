import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { BreedsController } from './controllers/breed.controller';
import { BreedsService } from './services/breed.service';
import { breedProviders } from './providers/breed.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [BreedsController],
  providers: [...breedProviders, BreedsService],
})
export class BreedModule { }