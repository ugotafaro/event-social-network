import { Controller, Get, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'schemas/user.schemas';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('users.get-users')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @MessagePattern('users.get-profile')
  getProfile(@Payload() user: User) {
    return this.usersService.getProfile(user);
  }

  @MessagePattern('users.get-by-id')
  getUserById(@Payload() id: string) {
    return this.usersService.getUserById(id);
  }

  @MessagePattern('users.update')
  async updateUser(@Payload() data: any) {
    return await this.usersService.updateUser(data.id, data.dto);
  }

  @MessagePattern('users.delete')
  async deleteUser(@Payload() id: string) {
    return await this.usersService.deleteUser(id);
  }

  @MessagePattern('users.add-event-liked')
  async addEventLiked(@Payload() data: any) {
    return await this.usersService.addEventLiked(data.userId, data.eventId);
  }

  @MessagePattern('users.remove-event-liked')
  async removeEventLiked(@Payload() data: any) {
    return await this.usersService.removeEventLiked(data.userId, data.eventId);
  }
}
