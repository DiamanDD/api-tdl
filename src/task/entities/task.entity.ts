import { tasks } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class Task implements tasks {
  @ApiProperty()
  id: string;
  @ApiProperty()
  is_completed: boolean;
  @ApiProperty()
  created_at: Date;
  @ApiProperty()
  description: string;
  @ApiProperty()
  todolist_id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  due_date: Date;
}
