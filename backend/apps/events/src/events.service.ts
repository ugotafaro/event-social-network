import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { EventDto } from 'dto/event.dto';
import { UpdateEventDto } from 'dto/updateEvent.dto';
import { Model, Types } from 'mongoose';
import { User } from 'schemas/user.schemas';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>,
    @InjectModel(User.name) private userModel: Model<User>,
    private config: ConfigService,
  ) {}

  async createEvent(dto: EventDto, user) {
    try {
      const createdEvent = new this.eventModel({
        ...dto,
        creator: user._id,
      });
      const savedEvent = (await createdEvent.save()).toObject();
      await this.userModel.findByIdAndUpdate(
        user._id,
        { $addToSet: { createdEvents: savedEvent._id } },
        { new: true },
      );
      return savedEvent;
    } catch (error) {
      throw new Error('Error during event creation');
    }
  }

  //get all events
  async getAllEvents() {
    try {
      const events = await this.eventModel.find();
      return events;
    } catch (error) {
      throw new Error('Error fetching events');
    }
  }

  //get event by id
  async getEventById(id: string) {
    try {
      const event = await this.eventModel.findById(id);
      return event.toObject();
    } catch (error) {
      throw new RpcException({
        message: 'Error fetching event',
        code: 500,
      });
    }
  }

  //update event
  async updateEvent(id: string, dto: UpdateEventDto) {
    try {
      const updatedEvent = await this.eventModel.findByIdAndUpdate(
        id, // Convert string to ObjectId
        dto,
        { new: true },
      );
      if (!updatedEvent) {
        throw new Error('Error updating event');
      }
      return updatedEvent.toObject();
    } catch (error) {
      throw new Error('Error updating event');
    }
  }

  //delete event
  async deleteEvent(id: string) {
    try {
      const deletedEvent = await this.eventModel.findByIdAndDelete(id);
      return deletedEvent;
    } catch (error) {
      throw new Error('Error deleting event');
    }
  }
}
