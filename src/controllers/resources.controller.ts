import { PartialResourceDTO, ResourceDTO } from '@DTOs/resource.dto';
import Interfaces from '@Interfaces/interfaces-inversify.mappings';
import IResourcesService from '@Interfaces/services/iresources.service';
import HttpStatusCodes from '@Shared/types/http-status-codes';
import { Response } from 'express';
import { inject } from 'inversify';
import {
  controller,
  httpGet,
  httpPost,
  requestBody,
  response,
} from 'inversify-express-utils';
import BaseApiController from './base-api.controller';

@controller('/resources')
export default class ResourcesController extends BaseApiController {
  constructor(
    @inject(Interfaces.ResourcesService)
    private readonly resourcesService: IResourcesService
  ) {
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
    @response() res: Response,
    @requestBody() body: PartialResourceDTO
  ): Promise<Response<ResourceDTO>> {
    const resource = await this.resourcesService.create(body, '4558a0b4-9963-42b3-8088-eb4849b5a215');
    return res.status(HttpStatusCodes.Ok).json(resource);
  }
}
