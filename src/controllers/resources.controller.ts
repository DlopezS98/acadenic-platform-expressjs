import { PartialResourceDTO, ResourceDTO } from '@DTOs/resource.dto';
import Interfaces from '@Interfaces/interfaces-inversify.mappings';
import IResourcesService from '@Interfaces/services/iresources.service';
import HttpStatusCodes from '@Shared/types/http-status-codes';
import { Response, Request } from 'express';
import { inject } from 'inversify';
import {
  controller,
  httpGet,
  httpPost,
  requestBody,
  response,
  request,
} from 'inversify-express-utils';
import Middlewares from '@Middlewares/middleware.mappings';
// import Middlewares, { constantValues } from '@Middlewares/middleware.mappings';
// import JWTPayload from '@Shared/types/jwt.payload';
import BaseApiController from './base-api.controller';

@controller('/resources', Middlewares.JwtAuthentication)
export default class ResourcesController extends BaseApiController {
  constructor(
    @inject(Interfaces.ResourcesService)
    private readonly resourcesService: IResourcesService
  ) // @inject(constantValues.CurrentUser) private readonly currentUser: JWTPayload
  {
    super();
  }

  @httpGet('/')
  public async getAll(
    @response() res: Response
  ): Promise<Response<ResourceDTO>> {
    const resources = await this.resourcesService.getAll();
    return res.status(HttpStatusCodes.Ok).json(resources);
  }

  @httpPost('/')
  public async create(
    @request() req: Request,
    @response() res: Response,
    @requestBody() body: PartialResourceDTO
  ): Promise<Response<ResourceDTO>> {
    const jwtPayload = req.app.get('user');
    const resource = await this.resourcesService.create(
      body,
      jwtPayload?.id ?? ''
    );
    return res.status(HttpStatusCodes.Ok).json(resource);
  }
}
