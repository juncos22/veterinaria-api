import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Pet } from "./pet.entity";

@Entity()
export class Breed {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Pet, (pet) => pet.breed)
    pets: Pet[];
}