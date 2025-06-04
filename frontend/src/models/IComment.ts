export interface IComment {
    _id: string;
    commentBody: string;
    managerId: string;
    studentId: string;
    createdAt: string;
}
export interface ICommentCreate {
    commentBody: string;
}