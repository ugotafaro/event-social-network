import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, Payload } from '@nestjs/microservices';
import { JwtAuthGuard } from 'guard';
import { EventDto } from 'dto/event.dto';
import { UpdateEventDto } from 'dto/updateEvent.dto';
import { ParamsTokenFactory } from '@nestjs/core/pipes';
import { UpdateUserDto } from 'dto/updateUser.dto';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('users')
  getAllUsers() {
    return this.appService.getAllUsers();
  }

  //get the user logged in
  @Get('users/profile')
  @UseGuards(JwtAuthGuard)
  getMe(@Request() req: any) {
    return this.appService.getMe(req.user);
  }

  @Get('users/:id')
  getUserById(@Param() params: any) {
    return this.appService.getUserById(params.id);
  }

  @Put('users/update/:id')
  async updateUser(@Param() params: any, @Body() dto: UpdateUserDto) {
    return await this.appService.updateUser(params.id, dto);
  }

  @Delete('users/delete/:id')
  async deleteUser(@Param() params: any) {
    return await this.appService.deleteUser(params.id);
  }

  @Post('auth/signin')
  signin(@Body() user: any) {
    return this.appService.signin(user);
  }

  @Post('auth/create')
  createUser(@Body() user: any) {
    return this.appService.createUser(user);
  }

  @Post('users/add-event-liked')
  async addEventLiked(@Body() data: any) {
    return await this.appService.addEventLiked(data.userId, data.eventId);
  }

  @Post('users/remove-event-liked')
  async removeEventLiked(@Body() data: any) {
    return await this.appService.removeEventLiked(data.userId, data.eventId);
  }

  @Post('events/create')
  // @UseGuards(JwtAuthGuard)
  async createEvent(@Body() data: any) {
    return await this.appService.createEvent(data.event, data.user);
  }

  @Get('events')
  //@UseGuards(JwtAuthGuard)
  getAllEvents() {
    return this.appService.getAllEvents();
  }

  @Get('events/:id')
  //@UseGuards(JwtAuthGuard)
  async getEventById(@Param() params: any) {
    return await this.appService.getEventById(params.id);
  }

  @Put('events/update/:id')
  //@UseGuards(JwtAuthGuard)
  async updateEvent(@Param() params: any, @Body() eventDto: UpdateEventDto) {
    return await this.appService.updateEvent(params.id, eventDto);
  }

  @Delete('events/delete/:id')
  async deleteEvent(@Param() params: any) {
    return await this.appService.deleteEvent(params.id);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/uploads', // Dossier pour stocker les images
        filename: (req, file, callback) => {
          const filename = `${Date.now()}_${file.originalname}`;
          callback(null, filename);
        },
      }),
    }),
  )
  uploadImage(@UploadedFile() file) {
    return { imageUrl: `/uploads/${file.filename}` }; // Retourne l'URL de l'image
  }
}
