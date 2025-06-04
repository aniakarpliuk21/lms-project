import { StudentStatusEnum } from "../enums/student.enum";
import { ApiError } from "../errors/api-error";
import { IComment } from "../interfaces/comment.interface";
import { ITokenPayload } from "../interfaces/token.interface";
import { commentRepository } from "../repositories/comment.repository";
import { studentRepository } from "../repositories/student.repository";

class CommentService {
  public async createComment(
    commentBody: string,
    studentId: string,
    tokenPayload: ITokenPayload,
  ): Promise<IComment> {
    const managerId = tokenPayload.managerId;
    const student = await studentRepository.getStudentById(studentId);
    if (!student) {
      throw new ApiError("Student not found", 404);
    }
    if (student._managerId && student._managerId.toString() !== managerId) {
      throw new ApiError("You are not allowed to comment this student", 403);
    }
    if (!student._managerId) {
      await studentRepository.updateStudent(studentId, {
        _managerId: managerId,
        status: StudentStatusEnum.IN_WORK,
      });
    }
    if (!student.status || student.status === StudentStatusEnum.NEW) {
      await studentRepository.updateStudent(studentId, {
        status: StudentStatusEnum.IN_WORK,
      });
    }

    return await commentRepository.createComment({
      commentBody,
      studentId,
      managerId,
    });
  }
  public async getAllCommentsByStudentId(
    studentId: string,
  ): Promise<IComment[]> {
    return await commentRepository.getAllCommentsByStudentId(studentId);
  }
}
export const commentService = new CommentService();
