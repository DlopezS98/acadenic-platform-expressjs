/* eslint-disable import/order */
/* eslint-disable no-console */
/* Paths & container must be at the beginning to load
  the relative paths & metadata for inversify */
import './paths-aliases';
import InversifyDIContainer from './inversify.config';

import { getRouteInfo, RouteInfo } from 'inversify-express-utils';
import { Container } from 'inversify';
import prettyjson from 'prettyjson';
import Environment from '@Config/environment';
import Application from './app';
import { isErrorObject } from '@Shared/guards/common-types.guard';
import PsqlConnection from '@Database/connection';

export default class Startup {
  private readonly application: Application;
  private readonly container: Container;
  private readonly environment: Environment;
  private readonly psqlConnection: PsqlConnection;

  constructor() {
    this.environment = new Environment();
    this.container = new InversifyDIContainer().initialize();
    this.application = new Application(this.container, this.environment);
    this.psqlConnection = new PsqlConnection(this.environment);
  }

  public async initialize(): Promise<{ started: boolean; message: string }> {
    try {
      const app = this.application.initialize();
      const routes: RouteInfo[] = getRouteInfo(this.container);
      const message = `Server listening on port: ${app.get('port')}`;
      this.psqlConnection.initialize();
      await app.listen(app.get('port'));

      console.log(prettyjson.render({ routes }));
      console.log(`Environment: ${app.get('env')}`);

      return { started: true, message };
    } catch (error) {
      const errorMessage = isErrorObject(error)
        ? error.message
        : 'Unexpected error while trying to start the server...';
      return {
        started: false,
        message: errorMessage,
      };
    }
  }
}

new Startup().initialize().then(console.log).catch(console.error);
