import { MiddlewaresMapping } from '@Shared/types/inversify.mappings.types';

const Middlewares: MiddlewaresMapping = {
  JwtAuthentication: Symbol.for('JwtAuthenticationMiddleware'),
};

// export const constantValues = {
//   CurrentUser: Symbol.for('CurrentUser')
// };

export default Middlewares;
