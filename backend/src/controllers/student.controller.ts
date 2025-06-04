import { NextFunction, Request, Response } from "express";

import {
  IStudentListQuery,
  IStudentUpdateDto,
  IStunentCreateDto,
} from "../interfaces/student.interface";
import { ITokenPayload } from "../interfaces/token.interface";
import { studentPresenter } from "../presenters/student.presenter";
import { studentService } from "../services/student.service";

class StudentController {
  public async createStudent(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const dto = req.body as IStunentCreateDto;
      const result = await studentService.createStudent(dto);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
  public async getStudentList(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query as unknown as IStudentListQuery;
      const result = await studentService.getStudentList(query);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
  public async getStudentStatistics(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await studentService.getStudentStatistics();
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
  public async getStudentById(req: Request, res: Response, next: NextFunction) {
    try {
      const studentId = req.params.studentId;
      const result = await studentService.getStudentById(studentId);
      const response = studentPresenter.toResponse(result);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }
  public async updateStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
      const studentId = req.params.studentId;
      const dto = req.body as IStudentUpdateDto;
      const result = await studentService.updateStudent(
        tokenPayload,
        dto,
        studentId,
      );
      const response = studentPresenter.toResponse(result);
      res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }
  public async deleteStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const studentId = req.params.studentId;
      await studentService.deleteStudent(studentId);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}
export const studentController = new StudentController();
