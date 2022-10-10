import Environment from '@Config/environment';
import { Knex } from 'knex';
import { knexSnakeCaseMappers } from 'objection';
import { join } from 'path';

export default class KnexEnviromentSetup {
  constructor(private readonly environment: Environment) {}

  public knexConfig: Record<string, Knex.Config> = {
    development: {
      client: 'pg',
      connection: {
        database: this.environment.DATABASE,
        user: this.environment.DB_USER,
        password: this.environment.DB_PASSWORD,
      },
      pool: {
        min: 2,
        max: 10,
      },
      migrations: {
        tableName: 'knex_migrations',
        directory: join(__dirname, 'migrations'),
      },
      seeds: {
        directory: join(__dirname, 'seeds'),
      },
      ...knexSnakeCaseMappers,
    },
    production: {
      client: 'pg',
      connection: {
        connectionString: this.environment.DATABASE_URL,
      },
      pool: {
        min: 2,
        max: 10,
      },
      migrations: {
        tableName: 'knex_migrations',
        directory: join(__dirname, 'migrations'),
      },
      seeds: {
        directory: join(__dirname, 'seeds'),
      },
      ...knexSnakeCaseMappers,
    },
  };

  getCurrentConfig(): Knex.Config {
    return this.knexConfig[this.environment.NAME];
  }
}
