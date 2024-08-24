import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(user_id: string, data: CreateTaskDto) {
    const todolist = await this.prisma.todolists.findUnique({
      where: { id: data.todolist_id, user_id },
    });
    if (todolist) {
      return this.prisma.tasks.create({ data: { ...data } });
    }
    throw new NotFoundException();
  }

  async findAll(user_id: string) {
    const tasks = await this.prisma.tasks.findMany({
      where: {
        todolists: {
          user_id,
        },
      },
    });
    if (!tasks.length) {
      throw new NotFoundException(
        `Tasks with not found or you don't have access to it.`,
      );
    }
    return tasks;
  }

  async findOne(id: string, user_id: string) {
    const task = await this.prisma.tasks.findUnique({
      where: {
        id,
        todolists: {
          user_id,
        },
      },
    });

    if (!task) {
      throw new NotFoundException(
        `Task with id ${id} not found or you don't have access to it.`,
      );
    }

    return this.prisma.tasks.findUnique({
      where: { id },
    });
  }

  async update(id: string, user_id: string, data: UpdateTaskDto) {
    const task = await this.prisma.tasks.findUnique({
      where: {
        id,
        todolists: {
          user_id,
        },
      },
    });

    if (!task) {
      throw new NotFoundException(
        `Task with id ${id} not found or you don't have access to it.`,
      );
    }
    return this.prisma.tasks.update({ where: { id }, data });
  }

  async remove(id: string, user_id: string) {
    try {
      const task = await this.prisma.tasks.findUnique({
        where: {
          id,
          todolists: {
            user_id,
          },
        },
      });

      if (!task) {
        throw new NotFoundException(
          `Task with id ${id} not found or you don't have access to it.`,
        );
      }

      return this.prisma.tasks.delete({
        where: { id },
      });
    } catch (error) {
      console.log(error);
      throw new NotFoundException(`Task with id ${id} not found.`);
    }
  }
}
