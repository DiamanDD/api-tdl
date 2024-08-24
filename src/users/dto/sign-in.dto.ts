import { ApiProperty } from '@nestjs/swagger';
import { UserResponse } from '../entities/user.entity';

export class SignInReq {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}

export class SignInRes extends UserResponse {
  @ApiProperty()
  access_token: string;
}
