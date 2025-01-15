import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto } from 'dto/users.dto';
import { Model } from 'mongoose';
import { User } from 'schemas/user.schemas';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async signin(dto: UserDto) {
    console.log('signin', dto);
    // find the user by email
    const user = await this.userModel.findOne({ email: dto.email }).exec();
    console.log('user', user);
    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    //compare password
    const pwMatches = await argon.verify(user.password, dto.password);
    if (!pwMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }

    return this.signToken(user.id, user.email);
  }

  async createUser(dto: UserDto) {
    try {
      const hash = await argon.hash(dto.password);

      const createdUser = new this.userModel({
        email: dto.email,
        password: hash,
      });

      const savedUser = await createdUser.save();

      const userWithoutPassword = { ...savedUser.toObject() };
      delete userWithoutPassword.password;

      console.log('createdUser', userWithoutPassword);

      return this.signToken(savedUser.id, savedUser.email);
    } catch (error) {
      console.error('Error during user creation:', error);

      if (error.code === 11000) {
        throw new RpcException({
          statusCode: 403,
          message: 'Cet utilisateur existe déjà',
        });
      }

      throw new RpcException({
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
