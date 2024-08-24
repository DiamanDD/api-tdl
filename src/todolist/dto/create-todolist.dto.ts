import { Todolist } from '../entities/todolist.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodolistDto implements Partial<Todolist> {
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
}
