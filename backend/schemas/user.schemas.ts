import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users', timestamps: true })
export class User {
  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  name: string;

  @Prop()
  followers: string[];

  @Prop()
  following: string[];

  @Prop()
  createdEvents: ObjectId[];

  @Prop()
  likedEvents: ObjectId[];

  @Prop()
  savedEvents: ObjectId[];

  @Prop()
  profilePicture: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
