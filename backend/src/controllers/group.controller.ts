import { NextFunction, Request, Response } from "express";

import { groupService } from "../services/group.service";

class GroupController {
  public async createGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      const response = await groupService.createGroup(name);
      res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }
  public async getAllGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await groupService.getAllGroup();
      res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }
}
export const groupController = new GroupController();
