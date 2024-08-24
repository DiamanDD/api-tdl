import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CurrentUser } from '../decorators';
import { UserResponse } from '../users/entities/user.entity';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Todolist } from '../todolist/entities/todolist.entity';
import { Task } from './entities/task.entity';

@ApiTags('task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOkResponse({ type: Todolist })
  create(
    @Body() createTaskDto: CreateTaskDto,
    @CurrentUser() { id: user_id }: UserResponse,
  ) {
    return this.taskService.create(user_id, createTaskDto);
  }

  @Get()
  @ApiOkResponse({ type: Task, isArray: true })
  findAll(@CurrentUser() { id: user_id }: UserResponse) {
    return this.taskService.findAll(user_id);
  }

  @Get(':id')
  @ApiOkResponse({ type: Task })
  findOne(
    @Param('id') id: string,
    @CurrentUser() { id: user_id }: UserResponse,
  ) {
    return this.taskService.findOne(id, user_id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Task })
  update(
    @Param('id') id: string,
    @CurrentUser() { id: user_id }: UserResponse,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.update(id, user_id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Task })
  remove(
    @Param('id') id: string,
    @CurrentUser() { id: user_id }: UserResponse,
  ) {
    return this.taskService.remove(id, user_id);
  }
}
