import { Module } from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';
import { PortfoliosController } from './portfolios.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Portfolio } from './portfolio.model';
import { Image } from '../images/image.model';
import { Comment } from '../comments/comment.model';
import { User } from '../users/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Image, Portfolio, Comment, User])],
  providers: [PortfoliosService],
  controllers: [PortfoliosController],
})
export class PortfoliosModule {}
