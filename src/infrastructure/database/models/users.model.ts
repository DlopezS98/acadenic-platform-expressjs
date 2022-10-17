import { compare, genSalt, hash } from 'bcrypt';
import { Model } from 'objection';
import IUser from '@Entities/user.entity';
import Regexp from '@Shared/constants/regexp';

export default class Users extends Model implements IUser {
  id!: string;
  email!: string;
  username!: string;
  password!: string;
  firstname?: string | undefined;
  lastname?: string | undefined;
  normalizedUsername!: string;
  normalizedEmail!: string;
  locked!: boolean;
  createdAt!: Date;
  updatedAt?: Date | undefined;

  static get tableName(): string {
    return 'users';
  }

  public async $beforeInsert(): Promise<void> {
    const salt: string = await genSalt(12);
    this.password = await hash(this.password, salt);
    this.normalizedEmail = Users.getNormalizedValue(this.email);
    this.normalizedUsername = Users.getNormalizedValue(this.username);
  }

  public matchPassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }

  public static getNormalizedValue(value: string): string {
    return String(value)
      .trim()
      .toUpperCase()
      .replace(Regexp.allWhitespaces, '');
  }
}
