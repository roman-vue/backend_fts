import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private userModel: Model<Task>) {}
  async create(createTaskDto: CreateTaskDto) {
    const saveTask = new this.userModel(createTaskDto);
    const save = await saveTask.save();
    return save;
  }

  async findAll() {
    const find = await this.userModel.find();
    return find;
  }
}
