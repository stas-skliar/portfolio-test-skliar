import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PortfoliosModule } from './portfolios/portfolios.module';
import { ImagesModule } from './images/images.module';
import { CommentsModule } from './comments/comments.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.model';
import { Portfolio } from './portfolios/portfolio.model';
import { Image } from './images/image.model';
import { Comment } from './comments/comment.model';
import { AuthModule } from './auth/auth.module';
import { AwsModule } from './aws/aws.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './logger/winston.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        autoLoadModels: true,
        synchronize: false,
        models: [User, Portfolio, Image, Comment],
      }),
    }),

    ThrottlerModule.forRoot({
      throttlers: [{ ttl: 60000, limit: 500 }],
    }),

    WinstonModule.forRoot(winstonConfig),

    PortfoliosModule,

    ImagesModule,

    CommentsModule,

    UsersModule,

    AuthModule,

    AwsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
