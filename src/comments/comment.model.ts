import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { Image } from '../images/image.model';
import { User } from '../users/user.model';

@Table({ tableName: 'comments' })
export class Comment extends Model<Comment> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column({
    type: DataType.STRING(500),
    allowNull: false,
    validate: {
      len: [1, 300],
    },
  })
  text: string;

  @ForeignKey(() => Image)
  @Column({ type: DataType.INTEGER })
  imageId: number;

  @BelongsTo(() => Image, { onDelete: 'CASCADE' })
  image: Image;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User, { onDelete: 'CASCADE' })
  user: User;
}
