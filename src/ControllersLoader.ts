import {Express, NextFunction, Request, RequestHandler, Response} from 'express';
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
      const routes: RouteDefinition[] = Reflect.getMetadata('routes', controller);
      const middlewares: RequestHandler[] = Reflect.getMetadata('middlewares', controller);

      routes.forEach(route => {
        app[route.requestMethod](
          path.join('/', prefix, route.path),
          ...middlewares,
          ...route.middlewares,
          (req: Request, res: Response, next: NextFunction) => Promise.resolve(instance[route.methodName](req, res)).catch(next),
        );
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
    const controllerClasses: Function[] = (this.options.controllers as any[])
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
