import { NextFunction, Request, Response } from 'express';
import { ObjectSchema, ValidationError } from 'joi';

import { ApiError } from '../errors/api-error';

class CommonMiddleware {
  public isQueryValid(validator: ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        req.query = await validator.validateAsync(req.query);
        next();
      } catch (e) {
        if (e instanceof ValidationError && e.details) {
          next(new ApiError(e.details[0].message, 400));
        } else {
          next(new ApiError('Invalid query parameters', 400));
        }
      }
    };
  }
}

export const commonMiddleware = new CommonMiddleware();
