import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserReq } from './dto/create-user.dto';
import { UserResponse } from './entities/user.entity';
import { SignInReq, SignInRes } from './dto/sign-in.dto';
import { CurrentUser, Public } from '../decorators';
import { Roles } from '../decorators/Roles';
import { RolesGuard } from '../guard/role.guard';
import { UserRole } from './constants';

@ApiTags('users')
@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('login')
  @ApiOkResponse({ type: SignInRes })
  sigIn(@Body() data: SignInReq) {
    return this.usersService.signIn(data);
  }

  @Get('me')
  getProfile(@CurrentUser() req: UserResponse) {
    return req;
  }

  @Post()
  @ApiOkResponse({ type: CreateUserReq })
  @Roles(UserRole.Admin)
  create(@Body() data: CreateUserReq) {
    return this.usersService.create(data);
  }

  @Get()
  @ApiOkResponse({ type: UserResponse, isArray: true })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: UserResponse })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserResponse })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
}
