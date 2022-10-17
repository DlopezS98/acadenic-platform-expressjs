import JWTPayload from '@Shared/types/jwt.payload';
import { BaseHttpController } from 'inversify-express-utils';

export default class BaseApiController extends BaseHttpController {
  getCurrentUser(): JWTPayload | undefined {
    return this.httpContext.request.app.get('user');
  }
}
