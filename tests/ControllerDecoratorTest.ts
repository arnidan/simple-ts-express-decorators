import {Controller} from '../src';
import {RequestHandler} from 'express';

describe('@Controller decorator test', () => {
  it('should properly init data', () => {
    @Controller()
    class Foo {}

    expect(Reflect.getMetadata('prefix', Foo)).toBeUndefined;
    expect(Reflect.getMetadata('routes', Foo)).toEqual([]);
    expect(Reflect.getMetadata('middlewares', Foo)).toEqual([]);
  });

  it('should properly init data with prefix', () => {
    @Controller('/test')
    class Foo {}

    expect(Reflect.getMetadata('prefix', Foo)).toEqual('/test');
    expect(Reflect.getMetadata('routes', Foo)).toEqual([]);
  });

  it('should properly init data with middlewares', () => {
    const middleware: RequestHandler = (req, res, next) => next();

    @Controller('/', middleware)
    class Foo {}

    expect(Reflect.getMetadata('prefix', Foo)).toEqual('/');
    expect(Reflect.getMetadata('routes', Foo)).toEqual([]);
    expect(Reflect.getMetadata('middlewares', Foo)).toEqual([middleware]);
  });
});
