import {HttpMethods} from './HttpMethods';
import {RequestHandler} from 'express';

export interface RouteDefinition {
  // Path to our route
  path: string;
  // HTTP Request method (get, post, ...)
  requestMethod: HttpMethods;
  // Method name within our class responsible for this route
  methodName: string | symbol;
  // middlewares to execute before method
  middlewares: RequestHandler[],
}
