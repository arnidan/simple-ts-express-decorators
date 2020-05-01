# Simple typescript decorators for express

[![Build Status](https://travis-ci.com/arnidan/simple-ts-express-decorators.svg?branch=master)](https://travis-ci.com/arnidan/simple-ts-express-decorators)
[![Coverage Status](https://coveralls.io/repos/github/arnidan/simple-ts-express-decorators/badge.svg?branch=master)](https://coveralls.io/github/arnidan/simple-ts-express-decorators?branch=master)

Simple controller and methods typescript decorators for express. 
Inspired by [ts-decorator-routing](https://github.com/nehalist/ts-decorator-routing) 

Provides pure request and response from express without complicated handlers or transformers. 

## Installation

1. Install module

    ```bash
    npm install simple-ts-express-decorators
    ```
    
    ```
    yarn add simple-ts-express-decorators
    ```

1. Install `reflect-metadata`

    ```bash
    npm install reflect-metadata
    ```
    
    ```
    yarn add reflect-metadata
    ```

1. Import `reflect-metadata` before using provided decorators

1. Enable typescript decorators in your `tsconfig.json`

    ```json
    {
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true
    }
    ````

## Example of usage

`UsersController.ts`

```typescript
import {Controller, Get} from 'simple-ts-express-decorators'; 
import {Request, Response} from 'express';

@Controller()
export class UsersController {
  
  @Get('/users')
  index(request: Request, response: Response) {
    response.json([
      {id: 1, username: 'example'}
    ]);
  }
}
```

`index.ts`

```typescript
import "reflect-metadata";
import * as express from 'express';
import {ControllersLoader} from 'simple-ts-express-decorators';
import {UserController} from './UserController'; 

const app = express();

new ControllersLoader({
  controllers: [UserController]
}).load(app);

app.listen(3000);
```

## Configuration options

| Option | Description |
| --- | --- |
| controllers | Required. Array of controllers to load or array of glob patterns to load controllers from |
| container | Any container implementation with `get()` method. For example [InversifyJS](https://github.com/inversify/InversifyJS)
