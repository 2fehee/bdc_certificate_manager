import {
  Table,
  Column,
  Model,
  CreatedAt,
  PrimaryKey,
  UpdatedAt,
} from 'sequelize-typescript';

@Table
export default class User extends Model<User> {
  @PrimaryKey
  @Column
  userId: string;

  @Column
  address: string;

  @Column
  secret: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}
