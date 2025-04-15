import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { Portfolio } from '../portfolios/portfolio.model';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    validate: {
      len: [2, 100],
    },
  })
  name: string;

  @Column({
    type: DataType.STRING(150),
    unique: true,
    allowNull: false,
    validate: {
      len: [5, 150],
      isEmail: true,
    },
  })
  email: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    validate: {
      len: [6, 255],
    },
  })
  password: string;

  @HasMany(() => Portfolio)
  portfolios: Portfolio[];
}
