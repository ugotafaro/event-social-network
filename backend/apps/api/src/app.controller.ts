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
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, Payload } from '@nestjs/microservices';
import { JwtAuthGuard } from 'guard';
import { EventDto } from 'dto/event.dto';
import { UpdateEventDto } from 'dto/updateEvent.dto';
import { ParamsTokenFactory } from '@nestjs/core/pipes';
import { UpdateUserDto } from 'dto/updateUser.dto';

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

  @Post('events/create')
  @UseGuards(JwtAuthGuard)
  async createEvent(@Body() event: any) {
    return await this.appService.createEvent(event);
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
}
