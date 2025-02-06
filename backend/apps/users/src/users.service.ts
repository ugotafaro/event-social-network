import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { get, Model } from 'mongoose';
import { User } from 'schemas/user.schemas';
import { Event } from 'schemas/event.schemas';
import * as argon from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Event.name) private eventModel: Model<Event>,
  ) {}

  async getAllUsers() {
    return this.userModel.find().exec();
  }

  getProfile(user: User) {
    return user;
  }

  async getUserById(id: string) {
    return this.userModel.findById(id).exec();
  }

  async updateUser(id: string, dto: any) {
    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(id, dto, {
        new: true,
      });
      if (!updatedUser) {
        throw new Error('Error updating user');
      }

      console.log('updatedUser', updatedUser);
      return updatedUser;
    } catch (error) {
      throw new Error('Error updating user');
    }
  }

  async changePassword(id: string, password: string, newPassword: string) {
    try {
      console.log('newPassword', newPassword);
      const hash = await argon.hash(newPassword);

      //verify if password is correct
      const user = await this.getUserById(id);

      console.log('user', user);

      if (!(await argon.verify(user.password, password))) {
        console.log('Password incorrect');
        throw new Error('Password incorrect');
      }

      const updatedUser = await this.userModel.findByIdAndUpdate(
        id,
        { password: hash },
        { new: true },
      );

      console.log('updatedUser', updatedUser);

      return updatedUser;
    } catch (error) {
      throw new Error('Error updating user');
    }
  }

  async deleteUser(id: string) {
    try {
      const deletedUser = await this.userModel.findByIdAndDelete(id);
      if (!deletedUser) {
        throw new Error('Error deleting user');
      }
      return deletedUser;
    } catch (error) {
      throw new Error('Error deleting user');
    }
  }

  async addEventLiked(userId: string, eventId: string) {
    return this.userModel.findByIdAndUpdate(
      userId,
      { $addToSet: { likedEvents: eventId } },
      { new: true },
    );
  }

  async removeEventLiked(userId: string, eventId: string) {
    return this.userModel.findByIdAndUpdate(
      userId,
      { $pull: { likedEvents: eventId } },
      { new: true },
    );
  }
}
