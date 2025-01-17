import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'schemas/user.schemas';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

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
}
