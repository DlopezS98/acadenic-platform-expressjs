import { config } from 'dotenv';
import { resolve } from 'path';

export default class Environment {
  constructor() {
    config({
      path: resolve(__dirname, `${this.NAME}.env`),
    });
  }

	public get NAME(): string {
		return (process.env.NODE_ENV || 'development').trim();
	}

  public get PORT(): number {
    return Number(process.env.PORT) || 4000;
  }

  public get JWT_SECRETE_KEY(): string {
    return process.env.JWT_SECRETE_KEY || 'G3N3R1C_S3CR3T3_K3Y_V4LU3';
  }

  public get JWT_EXPIRES_IN(): string {
    return process.env.JWT_EXPIRES_IN || '1h';
  }

  public get SERVER(): string {
    return process.env.SERVER_NAME || '127.0.0.1';
  }

	public get DATABASE(): string {
		return process.env.DATABASE_NAME || 'acadenic_dev';
	}

  public get DB_USER(): string {
    return process.env.PSQL_USERNAME || 'postgres';
  }

  public get DB_PASSWORD(): string {
    return process.env.PSQL_PASSWORD || 'postgres.password';
  }

  public get DATABASE_URL(): string {
		return process.env.DATABASE_URL || '';
	}
}
