export class CreatePetDto {
  name: string;
  ownerId: number;
  breedId: number;
  genderId: number;
}

export type PetList = {
  id: number;
  pet: string;
  owner: string;
  breed: string;
  gender: string;
};

export class UpdatePetDto {
  name?: string;
  ownerId?: number;
  breedId?: number;
  genderId?: number;
}
