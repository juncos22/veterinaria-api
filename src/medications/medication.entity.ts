import { Pet } from "../pets/entities/pet.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class Medication {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Pet, (pet) => pet.id)
    pet: Pet;
}