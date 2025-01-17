import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { EventDto } from 'dto/event.dto';
import { UpdateEventDto } from 'dto/updateEvent.dto';
import { Model, Types } from 'mongoose';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>,
    private config: ConfigService,
  ) {}

  async createEvent(dto: EventDto) {
    try {
      const createdEvent = new this.eventModel(dto);
      const savedEvent = await createdEvent.save();
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
      return event;
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
      return updatedEvent;
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
