import {
  Body,
  ForbiddenException,
  Inject,
  Injectable,
  OnModuleInit,
  Req,
} from '@nestjs/common';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import { UserDto } from 'dto/users.dto';
import { User } from 'schemas/user.schemas';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject('AUTH_CLIENT') private authCLient: ClientProxy,
    @Inject('USERS_CLIENT') private usersClient: ClientProxy,
    @Inject('EVENT_CLIENT') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('events.create');
    this.kafkaClient.subscribeToResponseOf('events.get-all');
    this.kafkaClient.subscribeToResponseOf('events.get-by-id');
    this.kafkaClient.subscribeToResponseOf('events.update');
    this.kafkaClient.subscribeToResponseOf('events.delete');

    await this.kafkaClient.connect();
  }

  // ----------------------USERS---------------------------------------------------

  getAllUsers() {
    return this.usersClient.send('users.get-users', {});
  }

  getMe(user: any) {
    return this.usersClient.send('users.get-profile', user);
  }

  getUserById(id: string) {
    return this.usersClient.send('users.get-by-id', id);
  }

  async updateUser(id: string, dto: any) {
    return await this.usersClient.send('users.update', { id, dto });
  }

  async deleteUser(id: string) {
    return await this.usersClient.send('users.delete', id);
  }

  async addEventLiked(userId: string, eventId: string) {
    return await this.usersClient.send('users.add-event-liked', {
      userId,
      eventId,
    });
  }

  async removeEventLiked(userId: string, eventId: string) {
    return await this.usersClient.send('users.remove-event-liked', {
      userId,
      eventId,
    });
  }

  async signin(dto: UserDto) {
    try {
      const response = await this.authCLient
        .send('auth.signin', dto)
        .toPromise();
      return response;
    } catch (error) {
      if (error?.message?.statusCode === 403) {
        throw new ForbiddenException(error.message.message);
      }

      throw error;
    }
  }

  async createUser(@Body() dto: UserDto) {
    console.log('createUser service api', dto);
    try {
      const response = await this.authCLient
        .send('auth.create', dto)
        .toPromise();
      return response;
    } catch (error) {
      if (error?.message?.statusCode === 403) {
        throw new ForbiddenException(error.message.message);
      }

      throw error;
    }
  }

  async changePassword(id: string, password: string, newPassword: string) {
    console.log('changePassword service api', id, password, newPassword);
    try {
      const response = await this.usersClient
        .send('users.change-password', { id, password, newPassword })
        .toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  // -----------------------------EVENTS--------------------------------------------

  async createEvent(event, user) {
    try {
      const response = await this.kafkaClient
        .send('events.create', { event, user })
        .toPromise();

      return response;
    } catch (error) {
      throw error;
    }
  }

  getAllEvents() {
    try {
      const response = this.kafkaClient.send('events.get-all', {}).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getEventById(id: string) {
    try {
      const response = await this.kafkaClient
        .send('events.get-by-id', id)
        .toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateEvent(id: string, dto: any) {
    try {
      const response = await this.kafkaClient
        .send('events.update', { id, dto })
        .toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteEvent(id: string) {
    try {
      const response = await this.kafkaClient
        .send('events.delete', id)
        .toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }
}
