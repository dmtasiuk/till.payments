import { Controller, Get, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {

  @Post('/login')
  public login() {
    return {
      firstName: 'John',
      lastName: 'Travolta',
      email: 'j.travolta@mail.co',
      accessToken: 'some_protected_value',
    }
  }

  @Get('/verify')
  public verify() {
    return this.login()
  }
}
