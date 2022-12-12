import {RequestHandler} from 'express';

export const Controller = (prefix = '', ...middlewares: RequestHandler[]): ClassDecorator => {
  return (target: any) => {
    Reflect.defineMetadata('prefix', prefix, target);

    if (!Reflect.hasMetadata('routes', target)) {
      Reflect.defineMetadata('routes', [], target);
    }

    if (!Reflect.hasMetadata('middlewares', target)) {
      Reflect.defineMetadata('middlewares', middlewares, target);
    }
  };
};
