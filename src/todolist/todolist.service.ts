import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodolistDto } from './dto/create-todolist.dto';
import { UpdateTodolistDto } from './dto/update-todolist.dto';
import { PrismaService } from '../prisma';

@Injectable()
export class TodolistService {
  constructor(private prisma: PrismaService) {}

  create(user_id: string, data: CreateTodolistDto) {
    return this.prisma.todolists.create({ data: { ...data, user_id } });
  }

  findAll(user_id: string) {
    return this.prisma.todolists.findMany({ where: { user_id } });
  }

  findOne(id: string, user_id: string) {
    return this.prisma.todolists.findUnique({ where: { id, user_id } });
  }

  update(id: string, user_id: string, data: UpdateTodolistDto) {
    return this.prisma.todolists.update({ where: { id, user_id }, data });
  }

  async remove(id: string, user_id: string) {
    const todolist = await this.prisma.todolists.findUnique({
      where: { id, user_id },
    });
    if (todolist) {
      await this.prisma.tasks.deleteMany({ where: { todolist_id: id } });
      return this.prisma.todolists.delete({ where: { id } });
    }
    throw new NotFoundException();
  }
}
