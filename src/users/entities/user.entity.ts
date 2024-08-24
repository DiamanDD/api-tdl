import { user_role, users as PrismaUser } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class User implements PrismaUser {
  @ApiProperty()
  id: string;
  @ApiProperty()
  created_at: Date;
  @ApiProperty()
  first_name: string;
  @ApiProperty()
  last_name: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  roles: user_role[];
}

export class UserResponse implements Omit<User, 'password' | 'created_at'> {
  @ApiProperty()
  id: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  last_name: string;
  @ApiProperty()
  first_name: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  roles: user_role[];
}
