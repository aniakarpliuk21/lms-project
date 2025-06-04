import React, {FC} from 'react';
import {IComment} from "@/models/IComment";
import {useAppSelector} from "@/hooks/useAppSelector";
interface IProps{
    comment:IComment;

}

const CommentComponent:FC<IProps> = ({comment}) => {
    const managers = useAppSelector(state => state.managerStore.managersFull);
    const commentManager = managers.find((manager) => manager._id === comment.managerId);
    return (
        <div className="flex justify-between align-center border-b border-gray-200">
            <div className="text-gray-800 whitespace-pre-line">
                {comment.commentBody}
            </div>
            <div>
                <div className="text-xs text-gray-500 mt-1">
                    {commentManager?.name} {commentManager?.surname} — {new Date(comment.createdAt).toLocaleDateString()}
                </div>
            </div>
        </div>
    );
};

export default CommentComponent;