import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserResponse } from '../users/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext): UserResponse => {
    const request = context.switchToHttp().getRequest();
    return request.user; // Предполагается, что Passport уже добавил сюда объект пользователя
  },
);
