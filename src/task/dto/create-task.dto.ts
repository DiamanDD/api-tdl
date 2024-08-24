import { Task } from '../entities/task.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto
  implements Omit<Task, 'created_at' | 'is_completed' | 'id'>
{
  @ApiProperty()
  description: string;
  @ApiProperty()
  todolist_id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  due_date: Date;
}
