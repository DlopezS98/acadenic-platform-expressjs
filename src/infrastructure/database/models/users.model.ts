import { compare, genSalt, hash } from 'bcrypt';
import { Model } from 'objection';
import IUser from '@Entities/user.entity';

export default class Users extends Model implements IUser {
  id!: string;
  email!: string;
  username!: string;
  password!: string;
  firstname?: string | undefined;
  lastname?: string | undefined;
  get normalizedUsername(): string {
    return this.username.trim().toUpperCase();
  }
  get normalizedEmail(): string {
    return this.email.trim().toUpperCase();
  }
  locked!: boolean;
  createdAt!: Date;
  updatedAt?: Date | undefined;

  static get tableName(): string {
    return 'users';
  }

  public async $beforeInsert(): Promise<void> {
    const salt: string = await genSalt(12);
    this.password = await hash(this.password, salt);
  }

  public matchPassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }
}
