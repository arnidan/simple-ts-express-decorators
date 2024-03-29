import {Controller, ControllersLoader, Get} from '../src';
import {RequestHandler} from 'express';

describe('ControllersLoader test', () => {

  it('should properly join prefix and path', () => {
    @Controller('/test/')
    class TestController {
      @Get('/get')
      test() {}

      @Get('//get2')
      test2() {}

      @Get(':id')
      test3() {}

      @Get('/')
      test4() {}
    }

    const getMock = jest.fn();
    const app = {get: getMock};

    new ControllersLoader({
      controllers: [TestController]
    }).load(app as any);

    expect(getMock).toHaveBeenCalledTimes(4);

    expect(getMock).toHaveBeenNthCalledWith(1,'/test/get', expect.anything());
    expect(getMock).toHaveBeenNthCalledWith(2,'/test/get2', expect.anything());
    expect(getMock).toHaveBeenNthCalledWith(3,'/test/:id', expect.anything());
    expect(getMock).toHaveBeenNthCalledWith(4,'/test/', expect.anything());
  });

  it('should properly add middlewares', () => {
    const controllerMiddleware: RequestHandler = (req, resp, next) => next();
    const routeMiddleware: RequestHandler = (req, resp, next) => next();

    @Controller('/', controllerMiddleware)
    class TestController {
      @Get('/get', routeMiddleware)
      test() {}

      @Get('/get2')
      test2() {}
    }

    const getMock = jest.fn();
    const app = {get: getMock};

    new ControllersLoader({
      controllers: [TestController]
    }).load(app as any);

    expect(getMock).toHaveBeenCalledTimes(2);

    expect(getMock).toHaveBeenNthCalledWith(1, '/get', controllerMiddleware, routeMiddleware, expect.anything());
    expect(getMock).toHaveBeenNthCalledWith(2, '/get2', controllerMiddleware, expect.anything());
  });

  it('should properly use container', () => {
    @Controller()
    class Foo {}

    const getMock = jest.fn();
    const container = {get: getMock};

    new ControllersLoader({
      controllers: [Foo],
      container
    }).load({} as any);

    expect(getMock).toHaveBeenCalledTimes(1);
    expect(getMock).toBeCalledWith(Foo);
  });
});
