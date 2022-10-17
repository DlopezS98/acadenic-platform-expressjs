import { InterfacesMapping } from '@Shared/types/inversify.mappings.types';

const Interfaces: InterfacesMapping = {
  UsersRepository: Symbol.for('IUsersRepository'),
  ResourcesRepository: Symbol.for('IResourcesRepository'),
  ResourcesService: Symbol.for('IResourcesService'),
  AuthenticationService: Symbol.for('IAuthenticationService'),
  UsersService: Symbol.for('IUsersService'),
};

export default Interfaces;
