import { Inject, Injectable } from '@nestjs/common';
import { CreateBreedDto } from '../dto/create-breed.dto';
import { Repository } from 'typeorm';
import { Breed } from '../entities/breed.entity';

@Injectable()
export class BreedsService {
  constructor(
    @Inject('BREED_REPOSITORY') private breedRepository: Repository<Breed>,
  ) {}

  create(createBreedDto: CreateBreedDto) {
    return this.breedRepository.save(createBreedDto);
  }

  findAll() {
    return this.breedRepository.find();
  }

  //   update(id: number, updateBreedDto: UpdateBreedDto) {
  //     return this.breedRepository.update(id, {
  //       name: updateBreedDto.name,
  //     });
  //   }

  //   remove(id: number) {
  //     return this.breedRepository.delete(id);
  //   }
}
