
import {urlBuilder} from "@/urls/urls";
import {myInterceptors} from "@/services/helper.service";
import {IComment} from "@/models/IComment";

const commentService = {
    createComment: async (commentBody: string, studentId: string):Promise<IComment> => {
        const url = urlBuilder.createCommentUrl();
        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({commentBody, studentId})
        }
        return (await myInterceptors(url, options).then(value => value.json()));

    },
    getAllCommentsByStudentId: async (studentId: string):Promise<IComment[]> => {
        const url = urlBuilder.getAllCommentsByStudentIdUrl() +`/${studentId}`;
        const options: RequestInit = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }
        return (await myInterceptors(url, options).then(value => value.json()));
    }
}
export {
    commentService
}