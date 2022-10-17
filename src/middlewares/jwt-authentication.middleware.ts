import Interfaces from '@Interfaces/interfaces-inversify.mappings';
import IAuthenticationService from '@Interfaces/services/iauthentication.service';
import IUsersService from '@Interfaces/services/iusers.service';
import HttpStatusCodes from '@Shared/types/http-status-codes';
// import JWTPayload from '@Shared/types/jwt.payload';
import HttpException, {
  NotFoundException,
} from '@Shared/utils/http-exceptions';
import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';
// import { constantValues } from './middleware.mappings';

@injectable()
export default class JwtAuthenticationMiddleware extends BaseMiddleware {
  constructor(
    @inject(Interfaces.AuthenticationService)
    private readonly authService: IAuthenticationService,
    @inject(Interfaces.UsersService)
    private readonly usersService: IUsersService
  ) {
    super();
  }

  async handler(req: Request, _: Response, next: NextFunction): Promise<void> {
    try {
      const bearerToken: string | undefined = req.headers.authorization;
      
      if (!bearerToken)
        throw new HttpException({
          message: 'Unauthorized, no token provided!',
          code: HttpStatusCodes.Forbidden,
        });

      const token = bearerToken.split(' ').pop() ?? '';
      const payload = this.authService.verifyToken(token);
      const user = await this.usersService.getById(payload.id);

      if (!user) throw new NotFoundException('The user doesn\x27t exists');

      const updatedPayload = this.authService.getJwtPayloadFromDTO(user);
      req.app.set('user', updatedPayload);
      // this.bind<JWTPayload>(constantValues.CurrentUser).toConstantValue(updatedPayload);
      next();
    } catch (error) {
      next(error);
    }
  }
}
