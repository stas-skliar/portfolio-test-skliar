import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { Portfolio } from '../portfolios/portfolio.model';
import { Image } from '../images/image.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Portfolio) private portfolioModel: typeof Portfolio,
    @InjectModel(Image) private imageModel: typeof Image,
  ) {}

  async deleteUser(userId: number) {
    const user = await this.userModel.findByPk(userId);
    if (!user) throw new NotFoundException('User not found');

    const portfolios = await this.portfolioModel.findAll({ where: { userId } });

    for (const portfolio of portfolios) {
      await this.imageModel.destroy({ where: { portfolioId: portfolio.id } });
    }

    await this.portfolioModel.destroy({ where: { userId } });
    await user.destroy();

    return { message: 'User deleted successfully' };
  }
}
