import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserReq } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma';
import { USER_SELECT } from './constants';
import { UserResponse } from './entities/user.entity';
import { SignInReq, SignInRes } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private JwtService: JwtService,
  ) {}

  async signIn(data: SignInReq): Promise<SignInRes> {
    const user = await this.prisma.users.findUnique({
      where: {
        ...data,
      },
      select: USER_SELECT,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      access_token: await this.JwtService.signAsync(user),
      ...user,
    };
  }

  create(data: CreateUserReq): Promise<UserResponse> {
    return this.prisma.users.create({
      data,
      select: USER_SELECT,
    });
  }

  findAll(): Promise<UserResponse[]> {
    return this.prisma.users.findMany({ select: USER_SELECT });
  }

  findOne(id: string): Promise<UserResponse> {
    return this.prisma.users.findUnique({ where: { id }, select: USER_SELECT });
  }

  update(id: string, data: UpdateUserDto) {
    return this.prisma.users.update({
      where: { id },
      data,
      select: USER_SELECT,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
