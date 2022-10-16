import IResourcesRepository from '@Interfaces/repositories/iresources.repository';
import IUsersRepository from '@Interfaces/repositories/iusers.repository';
import IResourcesService from '@Interfaces/services/iresources.service';
import { ObjectKeys } from './common.cd';

export interface InterfaceIdentifiers {
  UsersRepository: IUsersRepository;
  ResourcesRepository: IResourcesRepository;
  ResourcesService: IResourcesService;
}

// Middlewares go here...
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MiddlewareIndentifiers {}

export type InterfacesMapping = Record<
  ObjectKeys<InterfaceIdentifiers>,
  symbol
>;
export type MiddlewaresMapping = Record<
  ObjectKeys<MiddlewareIndentifiers>,
  symbol
>;
