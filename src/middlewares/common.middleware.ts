import { NextFunction, Request, Response } from 'express';
import { ObjectSchema, ValidationError } from 'joi';
import { isObjectIdOrHexString } from 'mongoose';

import { configs } from '../configs/configs';
import { RoleEnum } from '../enums/users/role.enum';
import { ApiError } from '../errors/api-error';

class CommonMiddleware {
  public createDtoAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      req.body = {
        name: configs.ADMIN_USER_Name,
        surname: configs.ADMIN_USER_Name,
        email: configs.ADMIN_EMAIL,
        role: RoleEnum.ADMIN,
        password: configs.ADMIN_PASSWORD,
        isActive: true,
      };
      next();
    } catch (e) {
      if (e instanceof ValidationError && e.details) {
        next(new ApiError(e.details[0].message, 400));
      } else {
        next(new ApiError('Invalid query parameters', 400));
      }
    }
  }

  public isIdValid(paramName: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params[paramName];
        if (!isObjectIdOrHexString(id)) {
          throw new ApiError('Invalid id', 400);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public isBodyValid(validator: ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        req.body = await validator.validateAsync(req.body);
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
