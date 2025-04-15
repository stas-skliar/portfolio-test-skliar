import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Portfolio } from './portfolio.model';
import { Image } from '../images/image.model';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class PortfoliosService {
  constructor(
    @InjectModel(Portfolio) private portfolioModel: typeof Portfolio,
    private readonly sequelize: Sequelize,
  ) {}

  async create(dto: CreatePortfolioDto, userId: number) {
    return this.portfolioModel.create({ ...dto, userId });
  }

  async findAllForUser(userId: number) {
    return this.portfolioModel.findAll({
      where: { userId },
      include: [Image],
    });
  }

  async deleteOwn(
    portfolioId: number,
    userId: number,
  ): Promise<{ message: string }> {
    const transaction = await this.sequelize.transaction();

    try {
      const portfolio = await this.portfolioModel.findByPk(portfolioId, {
        transaction,
        lock: true,
      });

      if (!portfolio) {
        throw new NotFoundException('Portfolio not found');
      }

      if (portfolio.userId !== userId) {
        throw new ForbiddenException('Access denied');
      }

      await portfolio.destroy({ transaction });

      await transaction.commit();

      return {
        message: 'Portfolio and all related images deleted successfully',
      };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
