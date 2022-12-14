import { Container } from 'inversify';
import { urlencoded, json, Application as ExpressApp } from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import morgan from 'morgan';
import cors from 'cors';
import Environment from './config/environment';
import pkg from '../package.json';

// Controllers
import './controllers';
import globalErrorMiddleware from './middlewares/global-error.middleware';

export default class Application {
  private readonly server: InversifyExpressServer;
  private readonly endpointsRootPath = '/api/v1';

  constructor(container: Container, private readonly environment: Environment) {
    this.server = new InversifyExpressServer(container, null, {
      rootPath: this.endpointsRootPath,
    });
  }

  public initialize = (): ExpressApp =>
    this.server
      .setConfig((app) => this.setServerConfig(app))
      .setErrorConfig((app) => this.setErrorMiddlewares(app))
      .build();

  public setServerConfig(app: ExpressApp): void {
    // Settings...
    app.set('port', this.environment.PORT);
    app.set('pkg', pkg);

    // Middlewares...
    app.use(morgan('dev'));
    app.use(cors());
    app.use(urlencoded({ extended: false }));
    app.use(json());
  }

  public setErrorMiddlewares(app: ExpressApp): void {
    app.use(globalErrorMiddleware);
  }
}
