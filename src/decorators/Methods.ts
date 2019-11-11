import {RouteDefinition} from '../RouteDefinition';
import {HttpMethods} from '../HttpMethods';

const getMethodFunction = (method: HttpMethods, path: string): MethodDecorator => {
  return (target, propertyKey): void => {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor);
    }

    const routes = Reflect.getMetadata('routes', target.constructor) as Array<RouteDefinition>;

    routes.push({
      path,
      requestMethod: method,
      methodName: propertyKey
    });

    Reflect.defineMetadata('routes', routes, target.constructor);
  };
};

export const Options = (path: string): MethodDecorator => {
  return getMethodFunction(HttpMethods.OPTIONS, path);
};

export const Get = (path: string): MethodDecorator => {
  return getMethodFunction(HttpMethods.GET, path);
};

export const Head = (path: string): MethodDecorator => {
  return getMethodFunction(HttpMethods.HEAD, path);
};

export const Post = (path: string): MethodDecorator => {
  return getMethodFunction(HttpMethods.POST, path);
};

export const Put = (path: string): MethodDecorator => {
  return getMethodFunction(HttpMethods.PUT, path);
};

export const Patch = (path: string): MethodDecorator => {
  return getMethodFunction(HttpMethods.PATCH, path);
};

export const Delete = (path: string): MethodDecorator => {
  return getMethodFunction(HttpMethods.DELETE, path);
};

export const Trace = (path: string): MethodDecorator => {
  return getMethodFunction(HttpMethods.TRACE, path);
};

export const Method = (method: HttpMethods, path: string): MethodDecorator => {
  return getMethodFunction(method, path);
};
