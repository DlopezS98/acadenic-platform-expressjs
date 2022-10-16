import 'reflect-metadata';
import { Container } from 'inversify';
import Interfaces from '@Interfaces/interfaces-inversify.mappings';
import IUsersRepository from '@Interfaces/repositories/iusers.repository';
import UsersRepository from '@Repositories/users.repository';
import IResourcesRepository from '@Interfaces/repositories/iresources.repository';
import ResourcesRepository from '@Repositories/resources.repository';
import IResourcesService from '@Interfaces/services/iresources.service';
import ResourcesService from '@Services/resources.service';

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
    this.container
      .bind<IResourcesRepository>(Interfaces.ResourcesRepository)
      .to(ResourcesRepository)
      .inRequestScope();
    this.container
      .bind<IResourcesService>(Interfaces.ResourcesService)
      .to(ResourcesService)
      .inRequestScope();
    return this.container;
  }
}
