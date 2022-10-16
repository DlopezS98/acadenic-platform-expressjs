import 'reflect-metadata';
import { Container } from 'inversify';
import Interfaces from '@Interfaces/interfaces-inversify.mappings';
import IUsersRepository from '@Interfaces/repositories/iusers.repository';
import UsersRepository from '@Repositories/users.repository';

// DI: Dependency Injection
export default class InversifyDIContainer {
  private readonly container: Container;

  constructor() {
    this.container = new Container({
      defaultScope: 'Singleton',
    });
  }

  public initialize(): Container {
    // services and repositories setup for DI go here...
    this.container
      .bind<IUsersRepository>(Interfaces.UsersRepository)
      .to(UsersRepository)
      .inRequestScope();
    return this.container;
  }
}
