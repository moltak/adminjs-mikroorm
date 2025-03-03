import { v4 } from 'uuid';
import { BaseEntity, Entity, Enum, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Car } from './Car';

export enum UserRole {
  ADMIN = 'admin',
  CLIENT = 'client',
}

@Entity({ tableName: 'users' })
export class User extends BaseEntity<User, 'id'> {
  @PrimaryKey({ columnType: 'uuid' })
  id = v4();

  @Property({ fieldName: 'first_name', columnType: 'text' })
  firstName: string;

  @Property({ fieldName: 'last_name', columnType: 'text' })
  lastName: string;

  @Property({ fieldName: 'age', columnType: 'integer' })
  age: number;

  @Enum(() => UserRole)
  role: UserRole;

  @Property({ fieldName: 'created_at', columnType: 'timestamptz' })
  createdAt: Date = new Date();

  @Property({ fieldName: 'updated_at', columnType: 'timestamptz', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @OneToMany(() => Car, (car) => car.owner)
  cars: Car[];
}
