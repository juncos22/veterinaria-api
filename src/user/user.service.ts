import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
    constructor(@Inject('USER_REPOSITORY') private userRepository: Repository<User>) { }

    register(newUser: CreateUserDto) {
        return this.userRepository.save({
            name: newUser.name,
            email: newUser.email,
            password: newUser.password
        });
    }

    findOne(email: string) {
        return this.userRepository.findOneBy({ email })
    }
}
