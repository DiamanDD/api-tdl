import { User } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../constants';

export class CreateUserReq implements Omit<User, 'created_at' | 'id'> {
  @ApiProperty()
  email: string;
  @ApiProperty()
  last_name: string;
  @ApiProperty()
  first_name: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  roles: UserRole[];
}
