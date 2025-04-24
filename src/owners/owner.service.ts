import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Owner } from './owner.entity';
import { CreateOwnerDto } from './owner.dto';

export class OwnerService {
  constructor(
    @Inject('OWNER_REPOSITORY') private ownerRepository: Repository<Owner>,
  ) {}

  save(owner: CreateOwnerDto) {
    return this.ownerRepository.save(owner);
  }

  list() {
    return this.ownerRepository.find();
  }
}
