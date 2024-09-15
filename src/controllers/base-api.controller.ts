import JWTPayload from '@Shared/types/jwt.payload';
import { Request } from 'express';
import { BaseHttpController } from 'inversify-express-utils';

export default class BaseApiController extends BaseHttpController {
  getCurrentUser(request: Request): JWTPayload | undefined {
    return request.app.get('user');
  }
}
