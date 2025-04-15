import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  PrimaryKey,
  AutoIncrement, AfterDestroy
} from "sequelize-typescript";
import { Portfolio } from '../portfolios/portfolio.model';
import { Comment } from '../comments/comment.model';
import { awsS3Client } from "../aws/aws-client";
import { getS3KeyFromUrl } from "../utils/get-s3-key.util";

@Table({ tableName: 'images' })
export class Image extends Model<Image> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    validate: {
      len: [3, 100],
    },
  })
  name: string;

  @Column({
    type: DataType.STRING(300),
    allowNull: true,
    validate: {
      len: [10, 300],
    },
  })
  description: string;

  @Column({ type: DataType.STRING, allowNull: false })
  imagePath: string;

  @ForeignKey(() => Portfolio)
  @Column({ type: DataType.INTEGER })
  portfolioId: number;

  @BelongsTo(() => Portfolio, { onDelete: 'CASCADE' })
  portfolio: Portfolio;

  @HasMany(() => Comment)
  comments: Comment[];

  @AfterDestroy
  static async deleteFromS3(instance: Image) {
    const key = getS3KeyFromUrl(instance.imagePath);

    try {
      await awsS3Client
        .deleteObject({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: key,
        })
        .promise();

      console.log(`[S3] Deleted: ${key}`);
    } catch (err) {
      // TODO: add additional logic
      console.error(`[S3 ERROR] Failed to delete ${key}:`, err.message);
    }
  }
}
