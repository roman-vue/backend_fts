import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GuardGuard } from 'src/guard/guard/guard.guard';

@ApiTags('TASK')
@ApiBearerAuth()
@UseGuards(GuardGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }
}
