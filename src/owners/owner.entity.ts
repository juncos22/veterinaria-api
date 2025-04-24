import { Pet } from 'src/pets/entities/pet.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Owner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @OneToMany(() => Pet, (pet) => pet.owner)
  pets: Pet[];
}
