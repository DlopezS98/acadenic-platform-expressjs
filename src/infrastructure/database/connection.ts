import Environment from '@Config/environment';
import { Knex, knex } from 'knex';
import { Model } from 'objection';
import KnexEnviromentSetup from './knex.config';

export default class PsqlConnection {
  private readonly knexOptions: Knex;

  constructor(private readonly environment: Environment) {
    const knexEnvironmentConfig = new KnexEnviromentSetup(this.environment).getCurrentConfig();
    this.knexOptions = knex(knexEnvironmentConfig);
  }

  public initialize(): void {
    Model.knex(this.knexOptions);
    // eslint-disable-next-line no-console
    console.log('database instance stablished');
  }
}
