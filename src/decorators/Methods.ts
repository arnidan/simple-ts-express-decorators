import {RouteDefinition} from '../RouteDefinition';
import {HttpMethods} from '../HttpMethods';
import {RequestHandler} from 'express';

const getMethodFunction = (method: HttpMethods, path: string, middlewares: RequestHandler[]): MethodDecorator => {
  return (target, propertyKey): void => {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor);
    }

    const routes = Reflect.getMetadata('routes', target.constructor) as Array<RouteDefinition>;

    routes.push({
      path,
      middlewares,
      requestMethod: method,
      methodName: propertyKey,
    });

    Reflect.defineMetadata('routes', routes, target.constructor);
  };
};

export const Options = (path: string, ...middlewares: RequestHandler[]): MethodDecorator => getMethodFunction(HttpMethods.OPTIONS, path, middlewares);
export const Get = (path: string, ...middlewares: RequestHandler[]): MethodDecorator => getMethodFunction(HttpMethods.GET, path, middlewares);
export const Head = (path: string, ...middlewares: RequestHandler[]): MethodDecorator => getMethodFunction(HttpMethods.HEAD, path, middlewares);
export const Post = (path: string, ...middlewares: RequestHandler[]): MethodDecorator => getMethodFunction(HttpMethods.POST, path, middlewares);
export const Put = (path: string, ...middlewares: RequestHandler[]): MethodDecorator => getMethodFunction(HttpMethods.PUT, path, middlewares);
export const Patch = (path: string, ...middlewares: RequestHandler[]): MethodDecorator => getMethodFunction(HttpMethods.PATCH, path, middlewares);
export const Delete = (path: string, ...middlewares: RequestHandler[]): MethodDecorator => getMethodFunction(HttpMethods.DELETE, path, middlewares);
export const Trace = (path: string, ...middlewares: RequestHandler[]): MethodDecorator => getMethodFunction(HttpMethods.TRACE, path, middlewares);
export const Method = (method: HttpMethods, path: string, ...middlewares: RequestHandler[]): MethodDecorator => getMethodFunction(method, path, middlewares);
