export class CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export class LoginUserDto {
  email: string;
  password: string;
}

export class AuthUser {
  id: number;
  email: string;
  token: string;
  constructor(id: number, email: string, name: string, token: string) {
    this.id = id;
    this.email = email;
    this.token = token;
  }
}
