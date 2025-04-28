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
};

export class UpdatePetDto {
  name?: string;
  ownerId?: number;
  breedId?: number;
  genderId?: string;
}
