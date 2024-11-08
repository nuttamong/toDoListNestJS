import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    private userService: UserService
  ){}

  async create(createTaskDto: CreateTaskDto, id: string) {
    const userResult = await this.userService.findOne(
      createTaskDto.userId,
    );

    if (!userResult || createTaskDto.userId !== id) {
      throw new NotFoundException('user not found');
    }

    const newTask = new this.taskModel(createTaskDto)
    return newTask.save();
  }

  async findAllTask(id: string): Promise<TaskDocument[]> {
    const result = await this.taskModel.find({"userId": id}).populate('userId', 'email name').exec()
    return result;
  }

  async findOne(id: string, userId: string): Promise<TaskDocument> {
    try {
      const result = await this.taskModel.findById(id).populate('userId', 'email name').exec()

      if (userId !== result.userId._id.toString()) {
        throw new NotFoundException('task not found');
      } 
      return result;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new NotFoundException('task not found');
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, userId: string) {
    try {
      const user = this.taskModel.findById(id).populate('userId', 'email name').exec()

      if (userId !== (await user).userId._id.toString()) {
        throw new NotFoundException('task not found');
      } 
      const result = await this.taskModel.findByIdAndUpdate(
        id,
        updateTaskDto,
        {new: true}
      ).exec()
      return result;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new NotFoundException('task not found');
    }
  }

  async remove(id: string, userId: string) {
    try {
      const user = await this.taskModel.findById(id).populate('userId', 'email name').exec()
      if (userId !== user.userId._id.toString()) {
        throw new NotFoundException('task not found');
      } 
      const result = await this.taskModel.findByIdAndDelete(id).exec()
      return result;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new NotFoundException('task not found');
    }
  }
}
