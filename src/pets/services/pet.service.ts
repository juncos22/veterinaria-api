import { Inject, Injectable } from '@nestjs/common';
import { Pet } from '../entities/pet.entity';
import { Repository } from 'typeorm';
import { CreatePetDto, PetList, UpdatePetDto } from '../dtos/pet.dto';

@Injectable()
export class PetService {
  constructor(
    @Inject('PET_REPOSITORY') private petRepository: Repository<Pet>,
  ) {}

  create(pet: CreatePetDto) {
    return this.petRepository.save({
      name: pet.name,
      owner: {
        id: pet.ownerId,
      },
      breed: {
        id: pet.breedId,
      },
      gender: pet.gender,
    });
  }

  findAll(data: string): Promise<PetList[]> {
    return this.petRepository
      .query(`SELECT p.id, p.name as pet, p.gender, b.name as breed, o.fullName as owner
        FROM pet p LEFT JOIN owner o ON p.ownerId = o.id
        LEFT JOIN breed b ON b.id = p.breedId
        WHERE o.fullName LIKE '%${data}%'  
        OR p.name LIKE '%${data}%' 
        OR p.gender LIKE '%${data}%' 
        OR b.name LIKE '%${data}%';`);
  }

  getAll(): Promise<PetList[]> {
    return this.petRepository
      .query(`SELECT p.id, p.name as pet, p.gender, b.name as breed, o.fullName as owner
        FROM pet p LEFT JOIN owner o ON p.ownerId = o.id
        LEFT JOIN breed b ON b.id = p.breedId
        WHERE p.active = true;`);
  }

  findOne(id: number): Promise<PetList> {
    return this.petRepository
      .query(`SELECT p.id, p.name as pet, p.gender, b.id as breedId, b.name as breed, o.id as ownerId, o.fullName as owner
        FROM pet p LEFT JOIN owner o ON p.ownerId = o.id
        LEFT JOIN breed b ON b.id = p.breedId
        WHERE p.active = true AND p.id = ${id};`);
  }

  async update(id: number, pet: UpdatePetDto): Promise<boolean> {
    const queryParams = Object.keys(pet)
      .map((key) => `${key}=?`)
      .join(',');

    await this.petRepository.query(
      `UPDATE pet SET ${queryParams} WHERE id = ?`,
      [...Object.values(pet), id],
    );
    return true;
  }

  async delete(id: number): Promise<boolean> {
    await this.petRepository.query(`UPDATE pet SET active=false WHERE id = ?`, [
      id,
    ]);
    return true;
  }
}
