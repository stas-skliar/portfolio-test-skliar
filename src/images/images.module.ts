import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Portfolio } from '../portfolios/portfolio.model';
import { Comment } from '../comments/comment.model';
import { Image } from './image.model';
import { User } from '../users/user.model';
import { AwsModule } from '../aws/aws.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Image, Portfolio, Comment, User]),
    AwsModule,
  ],
  providers: [ImagesService],
  controllers: [ImagesController],
})
export class ImagesModule {}
