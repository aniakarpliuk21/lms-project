export interface IComment {
  _id: string;
  commentBody: string;
  managerId: string;
  studentId: string;
  createdAt: Date;
}

// export type ICommentCreateDto = Pick<IComment, "commentBody" | "studentId">;
