import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Image } from '../images/image.model';
import { Portfolio } from '../portfolios/portfolio.model';
import { User } from "./user.model";

@Module({
  imports: [SequelizeModule.forFeature([User, Portfolio, Image])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
