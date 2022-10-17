import IUser, { Columns, PartialUser } from '@Entities/user.entity';

export default interface IUsersRepository {
  create(user: PartialUser): Promise<IUser>;
  getById(id: string): Promise<IUser | undefined>;
  getById(id: string, ...columns: Array<Columns>): Promise<IUser | undefined>;
  // getBy<T extends Columns>(column: T, value: IUser[T]): Promise<IUser> | Promise<undefined>;
  getAll(): Promise<Array<IUser>>;
  getAll(...columns: Array<Columns>): Promise<Array<IUser>>;
  getByEmail(email: string): Promise<IUser | undefined>;
  getByUsername(username: string): Promise<IUser | undefined>;
  matchPassword(currentPassword: string, incomingPassword: string): Promise<boolean>;
}