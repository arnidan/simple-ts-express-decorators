import {Express, Request, Response} from 'express';
import {importClassesFromDirectories} from './utils/importClassesFromDirectories';
import {RouteDefinition} from './RouteDefinition';
import * as path from 'path';

interface Container {
  get(identifier: string | symbol): Function;
}

interface ControllersLoaderOptions {
  controllers: Function[] | string[];
  container?: Container;
}

export class ControllersLoader {
  constructor(
    protected readonly options: ControllersLoaderOptions
  ) {}

  load(app: Express) {
    for (const controller of this.getControllers()) {
      const instance = this.getInstance(controller);

      const prefix = Reflect.getMetadata('prefix', controller);
      const routes: Array<RouteDefinition> = Reflect.getMetadata('routes', controller);

      routes.forEach(route => {
        app[route.requestMethod](path.join('/', prefix, route.path), (req: Request, res: Response) => {
          instance[route.methodName](req, res);
        });
      });
    }
  }

  protected getInstance(identifier: any) {
    if (this.options.container) {
      return this.options.container.get(identifier);
    }

    return new identifier();
  }

  protected getControllers(): Function[] {
    let controllerClasses: Function[] = (this.options.controllers as any[])
      .filter(controller => controller instanceof Function);

    return [
      ...controllerClasses,
      ...this.getControllersFromDirs(),
    ];
  }

  protected getControllersFromDirs(): Function[] {
    const controllerDirs = (this.options.controllers as any[])
      .filter(controller => typeof controller === 'string');

    return importClassesFromDirectories(controllerDirs);
  }
}
