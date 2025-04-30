import { MedicationDTO } from 'src/medications/medication.dto';

export class CreatePetDto {
  name: string;
  ownerId: number;
  breedId: number;
  gender: string;
}

export type PetList = {
  id: number;
  pet: string;
  owner: string;
  breed: string;
  gender: string;

  breedId: number;
  ownerId: number;

  medications: MedicationDTO[];
};

export class UpdatePetDto {
  name?: string;
  ownerId?: number;
  breedId?: number;
  genderId?: string;
}

export class PetResponse {
  success: boolean;
  message?: string;
  data?: PetList | PetList[];

  constructor(success: boolean, message?: string, data?: PetList | PetList[]) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}
