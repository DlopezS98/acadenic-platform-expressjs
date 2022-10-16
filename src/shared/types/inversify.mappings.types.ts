import IUsersRepository from '@Interfaces/repositories/iusers.repository';
import { ObjectKeys } from './common.cd';

export interface InterfaceIdentifiers {
  UsersRepository: IUsersRepository;
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
