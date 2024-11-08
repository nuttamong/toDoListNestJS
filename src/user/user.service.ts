import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDto } from './dto/register.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ){}

  async create(registerDto: RegisterDto): Promise<User> {
    const newUser = new this.userModel(registerDto)
    return newUser.save();
  }

  async findByEmail(email: string): Promise<UserDocument> {
    const result = await this.userModel.findOne({email}, 'email name').exec()
    return result;
  }

  async findByEmailForSignIn(email: string): Promise<UserDocument> {
    const result = await this.userModel.findOne({email}).exec()
    return result;
  }

  async findOne(id: string): Promise<UserDocument> {
    const result = await this.userModel.findById(id).exec()
    return result;
  }
}
