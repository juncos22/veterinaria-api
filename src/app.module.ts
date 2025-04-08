import { Module } from '@nestjs/common';
import { PetsModule } from './pets/pets.module';
import { UserModule } from './user/user.module';
import { MedicationsModule } from './medications/medications.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    PetsModule,
    MedicationsModule,
  ],
})
export class AppModule {
}