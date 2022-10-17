import 'reflect-metadata';
import { Container, BindingScopeEnum } from 'inversify';
import Interfaces from '@Interfaces/interfaces-inversify.mappings';
import IUsersRepository from '@Interfaces/repositories/iusers.repository';
import UsersRepository from '@Repositories/users.repository';
import IResourcesRepository from '@Interfaces/repositories/iresources.repository';
import ResourcesRepository from '@Repositories/resources.repository';
import IResourcesService from '@Interfaces/services/iresources.service';
import ResourcesService from '@Services/resources.service';
import IAuthenticationService from '@Interfaces/services/iauthentication.service';
import AuthenticationService from '@Services/authentication.service';
import IUsersService from '@Interfaces/services/iusers.service';
import UsersService from '@Services/users.service';
import JwtAuthenticationMiddleware from './middlewares/jwt-authentication.middleware';
import Middlewares from './middlewares/middleware.mappings';
// import Middlewares, { constantValues } from './middlewares/middleware.mappings';
// import JWTPayload from '@Shared/types/jwt.payload';

// DI: Dependency Injection
export default class InversifyDIContainer {
  private readonly container: Container;

  constructor() {
    this.container = new Container({
      defaultScope: BindingScopeEnum.Singleton,
    });
  }

  public initialize(): Container {
    // services and repositories setup for DI go here...
    this.container
      .bind<IUsersRepository>(Interfaces.UsersRepository)
      .to(UsersRepository)
      .inRequestScope();
    this.container
      .bind<IUsersService>(Interfaces.UsersService)
      .to(UsersService)
      .inRequestScope();
    this.container
      .bind<IResourcesRepository>(Interfaces.ResourcesRepository)
      .to(ResourcesRepository)
      .inRequestScope();
    this.container
      .bind<IResourcesService>(Interfaces.ResourcesService)
      .to(ResourcesService)
      .inRequestScope();
    this.container
      .bind<IAuthenticationService>(Interfaces.AuthenticationService)
      .to(AuthenticationService)
      .inRequestScope();

    // Middlewares...
    this.container
      .bind<JwtAuthenticationMiddleware>(Middlewares.JwtAuthentication)
      .to(JwtAuthenticationMiddleware);

    // this.container
    //   .bind<JWTPayload>(constantValues.CurrentUser)
    //   .toConstantValue({ email: 'somevalue@gmail.com' } as JWTPayload);
    // this.container.applyMiddleware(JwtAuthenticationMiddleware)
    return this.container;
  }
}
