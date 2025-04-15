import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/user.model';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
        id: number;
      };

      const user = await this.userModel.findByPk(decoded.id);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const { password, createdAt, updatedAt, ...safeUser } = user.get({
        plain: true,
      });
      request.user = safeUser;

      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
