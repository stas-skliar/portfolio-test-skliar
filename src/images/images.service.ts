import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Image } from './image.model';
import { Portfolio } from '../portfolios/portfolio.model';
import { Comment } from '../comments/comment.model';
import { User } from '../users/user.model';
import { Sequelize } from 'sequelize-typescript';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(Image) private imageModel: typeof Image,
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Portfolio) private portfolioModel: typeof Portfolio,
    @InjectModel(Comment) private commentModel: typeof Comment,
    private readonly sequelize: Sequelize,
  ) {}

  async getPublicFeed(query: PaginationQueryDto) {
    const { page = 1, limit = 10 } = query;
    const offset = (page - 1) * limit;

    const { count, rows } = await this.imageModel.findAndCountAll({
      include: { model: Portfolio, attributes: ['name'] },
      order: [['createdAt', 'DESC']],
      offset,
      limit,
    });

    return {
      meta: {
        total: count,
        page,
        limit,
      },
      data: rows,
    };
  }

  async addToPortfolio(
    dto: { name: string; description: string; imagePath: string },
    portfolioId: number,
    userId: number,
  ) {
    const portfolio = await this.portfolioModel.findByPk(portfolioId);
    if (!portfolio) throw new NotFoundException('Portfolio not found');
    if (portfolio.userId !== userId)
      throw new ForbiddenException('Not your portfolio');

    return this.imageModel.create({ ...dto, portfolioId });
  }

  async deleteOwnImage(
    imageId: number,
    userId: number,
  ): Promise<{ message: string }> {
    const transaction = await this.sequelize.transaction();

    try {
      const image = await this.imageModel.findByPk(imageId, {
        include: [Portfolio],
        transaction,
      });

      if (!image) {
        throw new NotFoundException('Image not found');
      }

      if (image.portfolio.userId !== userId) {
        throw new ForbiddenException('Forbidden');
      }

      await image.destroy({ transaction });

      await transaction.commit();

      return { message: 'Image deleted' };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async getImageComments(imageId: number) {
    return this.commentModel.findAll({
      where: { imageId },
      include: [{ model: this.userModel, attributes: ['id', 'name', 'email'] }],
      order: [['createdAt', 'ASC']],
    });
  }

  async addCommentToImage(imageId: number, text: string, userId: number) {
    const image = await this.imageModel.findByPk(imageId);
    if (!image) throw new NotFoundException('Image not found');

    return this.commentModel.create({ text, imageId, userId });
  }
}
