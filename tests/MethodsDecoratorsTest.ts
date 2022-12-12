import {Delete, Get, Head, HttpMethods, Method, Patch, Post, Put, RouteDefinition, Trace} from '../src';
import {RequestHandler} from 'express';

const decoratorsMapping = <{[index in HttpMethods]: (path: string, ...middlewares: RequestHandler[]) => MethodDecorator}> {
  [HttpMethods.GET]: Get,
  [HttpMethods.HEAD]: Head,
  [HttpMethods.POST]: Post,
  [HttpMethods.PUT]: Put,
  [HttpMethods.PATCH]: Patch,
  [HttpMethods.DELETE]: Delete,
  [HttpMethods.TRACE]: Trace,
};

for (const method in decoratorsMapping) {
  describe(`@${method[0].toUpperCase() + method.substr(1)} decorator test`, () => {
    const decoratorGetter = decoratorsMapping[method as HttpMethods];
    const middleware: RequestHandler = (req, res, next) => next();

    it('should properly attach routes', () => {
      class Foo {
        @decoratorGetter('path', middleware)
        public bar() {}
      }

      expect(Reflect.getMetadata('prefix', Foo)).toBeUndefined;

      const routes: Array<RouteDefinition> = Reflect.getMetadata('routes', Foo);

      expect(routes).toBeInstanceOf(Array);
      expect(routes.length).toEqual(1);

      expect(routes[0].methodName).toEqual('bar');
      expect(routes[0].path).toEqual('path');
      expect(routes[0].requestMethod).toEqual(method);
      expect(routes[0].middlewares).toEqual([middleware]);
    });
  });
}

describe('@Method decorator test', () => {
  it('should properly attach routes', () => {
    class Foo {
      @Method(HttpMethods.POST, 'path')
      public bar() {}

      @Method(HttpMethods.GET, 'path2')
      public bar2() {}
    }

    expect(Reflect.getMetadata('prefix', Foo)).toBeUndefined;

    const routes: Array<RouteDefinition> = Reflect.getMetadata('routes', Foo);

    expect(routes).toBeInstanceOf(Array);
    expect(routes.length).toEqual(2);

    expect(routes[0].methodName).toEqual('bar');
    expect(routes[0].path).toEqual('path');
    expect(routes[0].requestMethod).toEqual(HttpMethods.POST);

    expect(routes[1].methodName).toEqual('bar2');
    expect(routes[1].path).toEqual('path2');
    expect(routes[1].requestMethod).toEqual(HttpMethods.GET);
  });
});
