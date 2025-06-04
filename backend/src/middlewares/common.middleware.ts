import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { RoleEnum } from "../enums/role.enum";
import { ApiError } from "../errors/api-error";
import { ITokenPayload } from "../interfaces/token.interface";

class CommonMiddleware {
  public isValid(key: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params[key];
        if (!id) {
          return next();
        }
        if (!isObjectIdOrHexString(id)) {
          throw new ApiError(`Invalid id ${key}`, 400);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }
  public async isAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
      if (tokenPayload.role !== RoleEnum.ADMIN) {
        throw new ApiError("'Access denied'", 400);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
  public validateBody(validator: ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        req.body = await validator.validateAsync(req.body);
        next();
      } catch (e) {
        next(new ApiError(e.details[0].message, 400));
      }
    };
  }

  public validateQuery(validator: ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        req.query = await validator.validateAsync(req.query);
        next();
      } catch (e) {
        throw new ApiError(e.details[0].message, 400);
      }
    };
  }
}
export const commonMiddleware = new CommonMiddleware();
