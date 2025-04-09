import { Module } from '@nestjs/common';
import { PetsModule } from './pets/pets.module';
import { UserModule } from './user/user.module';
import { MedicationsModule } from './medications/medications.module';
import { ConfigModule } from '@nestjs/config';
import { BreedModule } from './pets/breeds/breed.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    PetsModule,
    MedicationsModule,
    BreedModule
  ],
})
export class AppModule {
}