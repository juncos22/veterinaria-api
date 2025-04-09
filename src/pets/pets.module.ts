import { Module } from '@nestjs/common';
import { PetController } from './controllers/pet.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PetService } from './services/pet.service';
import { petProviders } from './providers/pet.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...petProviders, PetService],
  controllers: [PetController]
})
export class PetsModule { }
