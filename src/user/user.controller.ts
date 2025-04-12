import { Body, Controller, Get, NotFoundException, Post, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from './user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService, private jwtService: JwtService) { }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
        const result = await this.userService.register(createUserDto)
        if (!result)
            return { error: "Error al registrar usuario" }

        const payload = { sub: result.id, username: result.name }
        const token = await this.jwtService.signAsync(payload, {
            secret: process.env.SECRET_TOKEN
        })
        return { email: result.email, name: result.name, token }
    }

    @Post('login')
    async login(@Body() user: LoginUserDto) {
        const result = await this.userService.findOne(user.name);
        if (!result)
            throw new NotFoundException("Usuario no encontrado")

        const isValidPassword = await bcrypt.compare(user.password, result.password)
        if (!isValidPassword)
            throw new UnauthorizedException("Credenciales incorrectas")

        const payload = { sub: result.id, username: result.name }
        const token = await this.jwtService.signAsync(payload, {
            secret: process.env.SECRET_TOKEN
        })
        return { email: result.email, name: result.name, token }
    }
}
