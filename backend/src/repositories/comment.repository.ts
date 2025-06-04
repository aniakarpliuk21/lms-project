import { IComment } from "../interfaces/comment.interface";
import { Comment } from "../model/comment.model";

class CommentRepository {
  public async createComment({
    commentBody,
    managerId,
    studentId,
  }): Promise<IComment> {
    return await Comment.create({ commentBody, managerId, studentId });
  }
  public async getAllCommentsByStudentId(
    studentId: string,
  ): Promise<IComment[]> {
    return await Comment.find({ studentId }).sort({ createdAt: -1 });
  }
}
export const commentRepository = new CommentRepository();
