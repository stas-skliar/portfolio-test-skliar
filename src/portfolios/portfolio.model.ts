import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { User } from '../users/user.model';
import { Image } from '../images/image.model';

@Table({ tableName: 'portfolios' })
export class Portfolio extends Model<Portfolio> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      len: [3, 100],
    },
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    validate: {
      len: [10, 300],
    },
  })
  description: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User, { onDelete: 'CASCADE' })
  user: User;

  @HasMany(() => Image)
  images: Image[];
}
