import { InterfacesMapping } from '@Shared/types/inversify.mappings.types';

const Interfaces: InterfacesMapping = {
  UsersRepository: Symbol.for('IUsersRepository'),
  ResourcesRepository: Symbol.for('IResourcesRepository'),
  ResourcesService: Symbol.for('IResourcesService'),
};

export default Interfaces;
