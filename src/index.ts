import InversifyDIContainer from "./inversify.config";
import Environment from "./config/environment";
import Application from "./app";
import { Container } from "inversify";
import { getRouteInfo, RouteInfo } from "inversify-express-utils";
import prettyjson from "prettyjson";

export default class Startup {
	private readonly application: Application;
	private readonly container: Container;

	constructor() {
		this.container = new InversifyDIContainer().initialize();
		this.application = new Application(this.container, new Environment());
	}

	public async initialize(): Promise<{ started: boolean; message: string }> {
		try {
			const app = this.application.initialize();
			const routes: RouteInfo[] = getRouteInfo(this.container);
			const message = `Server listening on port: ${app.get("port")}`;
			await app.listen(app.get("port"));

			console.log(prettyjson.render({ routes }));
			console.log(`Environment: ${app.get("env")}`);

			return { started: true, message };
		} catch (error: any) {
			const errorMessage =
				error?.message ??
				"Unexpected error while trying to start the server...";
			return {
				started: false,
				message: errorMessage,
			};
		}
	}
}

new Startup().initialize().then(console.log).catch(console.error);
