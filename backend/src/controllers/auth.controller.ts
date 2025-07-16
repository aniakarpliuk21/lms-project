import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api-error";
import { IVerifyToken } from "../interfaces/action-token.interface";
import {
  IAdminCreateDto,
  IChangePassword,
  IForgotPassword,
  IForgotPasswordSet,
  IManagerCreateDto,
  IManagerListQuery,
  IManagerLoginDto,
} from "../interfaces/manager.interface";
import { IPasswordCreateDto } from "../interfaces/password.interface";
import { ITokenPayload } from "../interfaces/token.interface";
import { authService } from "../services/auth.service";
import { emailService } from "../services/email.service";
import { managerService } from "../services/manager.service";

class AuthController {
  public async registerAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IAdminCreateDto;
      const managerId = req.res.locals.tokenPayload?.managerId;
      if (!managerId) {
        return next(new ApiError("Unauthorized", 401));
      }
      const result = await authService.registerAdmin(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }
  public async registerManager(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const dto = req.body as IManagerCreateDto;
      const managerId = req.res.locals.tokenPayload?.managerId;
      if (!managerId) {
        return next(new ApiError("Unauthorized", 401));
      }
      const result = await authService.registerManager(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }
  public async getManagerList(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query as unknown as IManagerListQuery;
      const result = await managerService.getManagerList(query);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
  public async getManagerListFull(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await managerService.getManagerListFull();
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IManagerLoginDto;
      const result = await authService.login(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
      const refreshToken = req.res.locals.refreshToken as string;
      const result = await authService.refresh(tokenPayload, refreshToken);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
      const tokenId = req.res.locals.tokenId as string;
      const result = await authService.logout(tokenPayload, tokenId);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async logoutAll(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
      const result = await authService.logoutAll(tokenPayload);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
  public async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
      const result = await managerService.getMe(tokenPayload);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IForgotPassword;
      await authService.forgotPassword(dto);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
  public async forgotPasswordSet(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
      const dto = req.body as IForgotPasswordSet;
      await authService.forgotPasswordSet(dto, tokenPayload);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
  public async verify(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
      const dto = req.body as IVerifyToken;
      const result = await authService.verify(dto, tokenPayload);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }
  public async addPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IPasswordCreateDto;
      await authService.addPassword(dto);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
  public async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
      const dto = req.body as IChangePassword;
      await authService.changePassword(dto, tokenPayload);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
  public async sendActivateEmail(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { email } = req.body;
      await emailService.sendActivateEmail(email);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
  public async banManager(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
      const { managerId } = req.body;
      await managerService.banManager(tokenPayload, managerId);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
  public async unbanManager(req: Request, res: Response, next: NextFunction) {
    try {
      const { managerId } = req.body;
      await managerService.unbanManager(managerId);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
  // public async getManagerById(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const managerId = req.params.managerId;
  //     const result = await managerService.getManagerById(managerId);
  //     res.status(200).json(result);
  //   } catch (e) {
  //     next(e);
  //   }
  // }
}

export const authController = new AuthController();
