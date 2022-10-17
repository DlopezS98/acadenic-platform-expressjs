import IUsersRepository from '@Interfaces/repositories/iusers.repository';
import IUser, { Columns, PartialUser } from '@Entities/user.entity';
import { isOfType } from '@Shared/guards/common-types.guard';
import Users from '@Database/models/users.model';
import { injectable } from 'inversify';
import { compare } from 'bcrypt';

@injectable()
export default class UsersRepository implements IUsersRepository {

  matchPassword(currentPassword: string, incomingPassword: string): Promise<boolean> {
    return compare(currentPassword, incomingPassword);
  }

  async getByEmail(email: string): Promise<IUser | undefined> {
    const userModel = await Users.query().findOne('normalizedEmail', email);
    return userModel ? this.mapModelToEntity(userModel) : undefined;
  }

  async getByUsername(username: string): Promise<IUser | undefined> {
    const userModel = await Users.query().findOne('normalizedUsername', username);
    return userModel ? this.mapModelToEntity(userModel) : undefined;
  }

  async create(user: PartialUser): Promise<IUser> {
    const userModel = await Users.query().insert(user);
    return this.mapModelToEntity(userModel);
  }

  async getById(id: string): Promise<IUser | undefined>;
  async getById(
    id: string,
    ...columns: Array<Columns>
  ): Promise<IUser | undefined>;
  async getById(
    id: unknown,
    ...columns: unknown[]
  ): Promise<IUser | undefined> {
    if (!isOfType('string', id)) return undefined;

    const userModel = await (columns && columns.length
      ? Users.query()
          .select(...columns)
          .findById(id)
      : Users.query().findById(id));

    return userModel ? this.mapModelToEntity(userModel) : undefined;
  }

  // getBy<T extends keyof IUser>(column: T, value: IUser[T]): Promise<IUser | undefined> {
  //   const userModel = Users.query().where(column, value);
  // }

  async getAll(): Promise<Array<IUser>>;
  async getAll(...columns: Array<Columns>): Promise<Array<IUser>>;
  async getAll(...columns: unknown[]): Promise<Array<IUser>> {
    const usersModel = await (columns && columns.length
      ? Users.query().select(...columns)
      : Users.query().select('*'));
    return usersModel && usersModel.length
      ? usersModel.map((model) => this.mapModelToEntity(model))
      : [];
  }

  private mapModelToEntity(model: Users): IUser {
    return {
      id: model.id,
      email: model.email,
      username: model.username,
      firstname: model.firstname,
      lastname: model.lastname,
      password: model.password,
      normalizedUsername: model.normalizedEmail,
      normalizedEmail: model.normalizedUsername,
      locked: model.locked,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };
  }
}
