import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthUser, CreateUserDto, LoginUserDto } from './user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ResponseDto } from 'src/utils/response.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
      const result = await this.userService.register(createUserDto);
      if (!result)
        return new ResponseDto<AuthUser>(false, 'Error al registrar usuario');

      const payload = { sub: result.id, username: result.name };
      const token = await this.jwtService.signAsync(payload, {
        secret: process.env.SECRET_TOKEN,
      });
      return new ResponseDto<AuthUser>(true, '', {
        id: result.id,
        email: result.email,
        name: result.name,
        token,
      } as AuthUser);
    } catch (error: any) {
      console.log('RegisterUserError:', error);
      return new ResponseDto<AuthUser>(false, error.message);
    }
  }

  @Post('login')
  async login(@Body() user: LoginUserDto) {
    try {
      const result = await this.userService.findOne(user.email);
      if (!result)
        return new ResponseDto<AuthUser>(false, 'Usuario no encontrado');

      const isValidPassword = await bcrypt.compare(
        user.password,
        result.password,
      );
      if (!isValidPassword)
        return new ResponseDto<AuthUser>(false, 'Credenciales incorrectas');

      const payload = { sub: result.id, username: result.name };
      const token = await this.jwtService.signAsync(payload, {
        secret: process.env.SECRET_TOKEN,
      });
      return new ResponseDto<AuthUser>(true, '', {
        id: result.id,
        email: result.email,
        name: result.name,
        token,
      } as AuthUser);
    } catch (error: any) {
      console.log('LoginUserError:', error);
      return new ResponseDto<AuthUser>(false, error.message);
    }
  }
}
