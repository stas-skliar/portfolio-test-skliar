import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUser } from './types/auth-user.type';

export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): AuthUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
