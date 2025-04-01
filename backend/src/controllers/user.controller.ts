import { NextFunction, Request, Response } from "express";

import { IUserCreateDto } from "../interfaces/user.interface";
import { userService } from "../services/userService";

class UserController {
  public async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const dto = req.body as IUserCreateDto;
      const result = await userService.register(dto);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
}
export const userController = new UserController();
