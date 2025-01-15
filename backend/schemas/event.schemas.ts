import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type EventDocument = HydratedDocument<Event>;

@Schema({ collection: 'events', timestamps: true })
export class Event {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  date: Date;

  @Prop()
  location: string;

  @Prop()
  creator: ObjectId;

  @Prop()
  likes: string[];

  @Prop()
  image: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
