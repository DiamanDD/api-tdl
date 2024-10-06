import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { CreateTodolistDto } from './dto/create-todolist.dto';
import { UpdateTodolistDto } from './dto/update-todolist.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../decorators';
import { UserResponse } from '../users/entities/user.entity';
import { Todolist } from './entities/todolist.entity';

@ApiTags('todolist')
@Controller('todolist')
export class TodolistController {
  constructor(private readonly todolistService: TodolistService) {}

  @Post()
  @ApiOkResponse({ type: Todolist })
  create(@Body() data: CreateTodolistDto, @CurrentUser() { id }: UserResponse) {
    return this.todolistService.create(id, data);
  }

  @Get()
  @ApiOkResponse({ type: Todolist, isArray: true })
  findAll(@CurrentUser() { id }: UserResponse) {
    return this.todolistService.findAll(id);
  }

  @Get(':todolist_id')
  @ApiOkResponse({ type: Todolist })
  findOne(
    @Param('todolist_id') todolist_id: string,
    @CurrentUser() { id: user_id }: UserResponse,
  ) {
    return this.todolistService.findOne(todolist_id, user_id);
  }

  @Patch(':todolist_id')
  @ApiOkResponse({ type: Todolist })
  update(
    @Param('todolist_id') todolist_id: string,
    @Body() updateTodolistDto: UpdateTodolistDto,
    @CurrentUser() { id: user_id }: UserResponse,
  ) {
    return this.todolistService.update(todolist_id, user_id, updateTodolistDto);
  }

  @Delete(':todolist_id')
  remove(
    @Param('todolist_id') todolist_id: string,
    @CurrentUser() { id: user_id }: UserResponse,
  ) {
    return this.todolistService.remove(todolist_id, user_id);
  }
}
