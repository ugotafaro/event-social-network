import { Controller, Get, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtAuthGuard } from 'guard';

@Controller()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @MessagePattern('events.create')
  async createEvent(@Payload() data: any) {
    try {
      const createdEvent = await this.eventsService.createEvent(
        data.event,
        data.user,
      ); // Save the event
      return createdEvent; // This will be sent back as the response
    } catch (error) {
      throw new Error('Error creating event');
    }
  }

  @MessagePattern('events.get-all')
  async getAllEvents() {
    try {
      const events = await this.eventsService.getAllEvents();
      return events;
    } catch (error) {
      throw new Error('Error fetching events');
    }
  }

  @MessagePattern('events.get-by-id')
  async getEventById(@Payload() id: string) {
    try {
      const event = await this.eventsService.getEventById(id);
      return event;
    } catch (error) {
      throw new Error('Error fetching event');
    }
  }

  @MessagePattern('events.update')
  async updateEvent(@Payload() data: any) {
    try {
      const updatedEvent = await this.eventsService.updateEvent(
        data.id,
        data.dto,
      );
      return updatedEvent;
    } catch (error) {
      throw new Error('Error updating event');
    }
  }

  @MessagePattern('events.delete')
  async deleteEvent(@Payload() id: string) {
    try {
      const deletedEvent = await this.eventsService.deleteEvent(id);
      return deletedEvent;
    } catch (error) {
      throw new Error('Error deleting event');
    }
  }
}
