import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Breed } from '../breeds/entities/breed.entity';
import { Owner } from 'src/owners/owner.entity';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Owner, (owner) => owner.id)
  owner: Owner;

  @ManyToOne(() => Breed, (breed) => breed.id)
  breed: Breed;

  @Column()
  gender: string;

  @Column({
    type: 'boolean',
    default: true,
    nullable: false,
  })
  active: boolean;
}
