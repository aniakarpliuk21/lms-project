import { NextFunction, Request, Response } from "express";

import { ITokenPayload } from "../interfaces/token.interface";
import { commentService } from "../services/comment.service";

class CommentController {
  public async createComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { commentBody, studentId } = req.body;
      const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
      const result = await commentService.createComment(
        commentBody,
        studentId,
        tokenPayload,
      );
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
  public async getAllCommentsByStudentId(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const studentId = req.params.studentId;
      const result = await commentService.getAllCommentsByStudentId(studentId);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
}
export const commentController = new CommentController();
