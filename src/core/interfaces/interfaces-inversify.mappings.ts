import { InterfacesMapping } from '@Shared/types/inversify.mappings.types';

const Interfaces: InterfacesMapping = {
  UsersRepository: Symbol.for('IUsersRepository'),
};

export default Interfaces;
