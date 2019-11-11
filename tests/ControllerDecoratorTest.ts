import 'reflect-metadata';
import {Controller} from '../src';

describe('@Controller decorators test', () => {
  it('should properly init data', function () {
    @Controller()
    class Foo {}

    expect(Reflect.getMetadata('prefix', Foo)).toBeUndefined;
    expect(Reflect.getMetadata('routes', Foo)).toEqual([]);
  });

  it('should properly init data with prefix', () => {
    @Controller('/test')
    class Foo {}

    expect(Reflect.getMetadata('prefix', Foo)).toEqual('/test');
    expect(Reflect.getMetadata('routes', Foo)).toEqual([]);
  });
});
