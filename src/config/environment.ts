import { config } from 'dotenv';
import { resolve } from 'path';

export default class Environment {
	constructor() {
		const env = (process.env.NODE_ENV || 'development').trim();

		config({
			path: resolve(__dirname, `${env}.env`),
		});
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
}
