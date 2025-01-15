import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller('users')
export class AppController {
  constructor(
    @Inject('AUTH_CLIENT') private readonly authService: ClientProxy,
  ) {}

  @Get()
  getAllUsers() {
    return this.authService.send('auth.get-users', {});
  }
}
