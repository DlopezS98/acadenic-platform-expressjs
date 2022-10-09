import 'reflect-metadata';
import { Container } from 'inversify';

// DI: Dependency Injection
export default class InversifyDIContainer {
	private readonly container: Container;

	constructor() {
		this.container = new Container({
			defaultScope: 'Singleton',
		});
	}

  public initialize(): Container {
    // services and repositories setup for DI go here...
    return this.container;
  }
}
