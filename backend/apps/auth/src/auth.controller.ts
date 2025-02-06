import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Ctx, MessagePattern, Payload } from '@nestjs/microservices';
import { User } from 'schemas/user.schemas';
import { UserDto } from 'dto/users.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @MessagePattern('auth.create')
  createUser(@Payload() user: UserDto) {
    console.log('createUser auth controller', user);
    return this.authService.createUser(user);
  }

  @MessagePattern('auth.signin')
  signin(@Payload() user: UserDto) {
    return this.authService.signin(user);
  }
}
