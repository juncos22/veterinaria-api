import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from './user.provider';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule, JwtModule.register({
    secret: process.env.SECRET_TOKEN,
    global: true,
  }),],
  providers: [...userProviders, UserService, JwtService],
  controllers: [UserController],
})
export class UserModule { }
