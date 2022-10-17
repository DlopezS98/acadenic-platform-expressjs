import IResourcesRepository from '@Interfaces/repositories/iresources.repository';
import IUsersRepository from '@Interfaces/repositories/iusers.repository';
import IAuthenticationService from '@Interfaces/services/iauthentication.service';
import IResourcesService from '@Interfaces/services/iresources.service';
import IUsersService from '@Interfaces/services/iusers.service';
import JwtAuthenticationMiddleware from 'src/middlewares/jwt-authentication.middleware';
import { ObjectKeys } from './common.cd';

export interface InterfaceIdentifiers {
  UsersRepository: IUsersRepository;
  UsersService: IUsersService,
  ResourcesRepository: IResourcesRepository;
  ResourcesService: IResourcesService;
  AuthenticationService: IAuthenticationService;
}

// Middlewares go here...
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MiddlewareIndentifiers {
  JwtAuthentication: JwtAuthenticationMiddleware;
}

export type InterfacesMapping = Record<
  ObjectKeys<InterfaceIdentifiers>,
  symbol
>;
export type MiddlewaresMapping = Record<
  ObjectKeys<MiddlewareIndentifiers>,
  symbol
>;
