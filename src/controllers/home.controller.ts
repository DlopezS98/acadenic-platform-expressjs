import { Request, Response } from 'express';
import { controller, httpGet } from 'inversify-express-utils';
import BaseApiController from './base-api.controller';

@controller('/')
export default class HomeController extends BaseApiController {
  @httpGet('')
  public index(req: Request, res: Response): Response {
    const { app } = req;

    return res.status(200).json({
      message: 'Welcome to AcadeNic API',
      name: app.get('pkg').name,
      version: app.get('pkg').version,
      description: app.get('pkg').description,
      author: app.get('pkg').author,
      repository: app.get('pkg').repository,
      license: app.get('pkg').license
    })
  }
}