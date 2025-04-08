import { User } from "src/user/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Breed } from "./breed.entity";
import { Gender } from "./gender.entity";

@Entity()
export class Pet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => User, (user) => user.id)
    owner: User;

    @ManyToOne(() => Breed, (breed) => breed.id)
    breed: Breed;

    @ManyToOne(() => Gender, (gender) => gender.id)
    gender: Gender;
}