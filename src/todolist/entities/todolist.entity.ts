import { todolists } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class Todolist implements todolists {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  created_at: Date;
  @ApiProperty()
  user_id: string;
}
