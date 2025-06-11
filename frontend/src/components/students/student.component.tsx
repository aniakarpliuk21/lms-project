"use client";
import React, { FC, useEffect, useState } from 'react';
import { IStudent } from "@/models/IStudent";
import { ICommentCreate } from "@/models/IComment";
import { useForm } from "react-hook-form";
import CommentComponent from "@/components/comment.component";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {useAppSelector} from "@/hooks/useAppSelector";
import {commentSliceActions} from "@/redux/slices/commentSlice/commentSlice";


interface IProps {
    student: IStudent;
    rowClass?: string;
    isSelected: boolean;
    onToggle: () => void;
    onOpenModal: (student: IStudent) => void;
}

const StudentComponent: FC<IProps> = ({ student, rowClass = "", isSelected, onToggle, onOpenModal}) => {
    const dispatch = useAppDispatch();
    const managers = useAppSelector(state => state.managerStore.managersFull);
    const comments = useAppSelector(state => state.commentStore.comments);
    const { handleSubmit, register, formState: { errors }, reset } = useForm<ICommentCreate>();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isCommentLoading, setIsCommentLoading] = useState(false);
    const studentManager = managers.find((manager) => manager._id === student._managerId);
    useEffect(() => {
        const getAllCommentsByStudentId = async () => {
            setIsCommentLoading(true);
            await dispatch(commentSliceActions.getAllCommentsByStudentId(student._id));
            setIsCommentLoading(false);
        };

        if (isSelected) {
            getAllCommentsByStudentId();
        }
    }, [isSelected, dispatch, student._id]);

    const customHandler = async (formData: ICommentCreate) => {
        try {
            setIsCommentLoading(true);
            await dispatch(commentSliceActions.createComment({
                commentBody: formData.commentBody,
                studentId: student._id
            }));
            await dispatch(commentSliceActions.getAllCommentsByStudentId(student._id));
            reset();
        } catch (e) {
            setErrorMessage(`Failed to add comment ${e}`);
        } finally {
            setIsCommentLoading(false);
        }
    };

    const updateStudentHandler = () => {
        onOpenModal(student);
    };

    return (
        <>
            <tr
                className={`${rowClass} hover:bg-gray-100 cursor-pointer`}
                onClick={onToggle}
            >
                <td className="px-2 py-1">{student.id}</td>
                <td className="px-2 py-1">{student.name == null ? "null" : student.name}</td>
                <td className="px-2 py-1">{student.surname == null ? "null" : student.surname}</td>
                <td className="px-2 py-1">{student.email == null ? "null" : student.email}</td>
                <td className="px-2 py-1">{student.phone == null ? "null" : student.phone}</td>
                <td className="px-2 py-1">{student.age == null ? "null" : student.age}</td>
                <td className="px-2 py-1">{student.course == null ? "null" : student.course}</td>
                <td className="px-2 py-1">{student.course_format == null ? "null" : student.course_format}</td>
                <td className="px-2 py-1">{student.course_type == null ? "null" : student.course_type}</td>
                <td className="px-2 py-1">{student.status == null ? "null" : student.status}</td>
                <td className="px-2 py-1">{student.sum == null ? "null" : student.sum}</td>
                <td className="px-2 py-1">{student.alreadyPaid == null ? "null" : student.alreadyPaid}</td>
                <td className="px-2 py-1">{student.group == null ? "null" : student.group}</td>
                <td className="px-2 py-1">{new Date(student.createdAt).toLocaleDateString()}</td>
                <td className="px-2 py-1"> {studentManager?.name && studentManager?.surname
                    ? `${studentManager.name} ${studentManager.surname}`
                    : "null"}</td>
            </tr>

            {isSelected && (
                <tr className="bg-gray-50">
                <td colSpan={15} className="p-3">
                        <div className="flex justify-between">
                            <div>
                                <div><strong>Message:</strong> {student.msg}</div>
                                <div><strong>UTM:</strong> {student.utm}</div>
                            </div>
                            <div>
                                {isCommentLoading ? (
                                    <div className="flex justify-center items-center h-20">
                                        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-lime-500 border-solid"></div>
                                    </div>
                                ) : (
                                comments.length > 0 && (
                                    <div className="bg-white p-2 rounded-md mb-2 w-[500px]">
                                        {comments.map((comment) => (
                                            <CommentComponent
                                                comment={comment}
                                                key={comment._id}
                                            />
                                        ))}
                                    </div>
                                    )
                                )}
                                <form
                                    onSubmit={handleSubmit(customHandler)}
                                    className="flex items-center gap-2 bg-white p-2 rounded-md w-[500px]"
                                >
                                    <input
                                        type="text"
                                        id="comment"
                                        placeholder="Comment"
                                        {...register("commentBody")}
                                        className="flex-1 h-10 rounded-md bg-gray-100 p-3 text-sm shadow-sm focus:border-lime-600 focus:ring-1 focus:ring-lime-600 focus:outline-none"
                                    />
                                    <button
                                        type="submit"
                                        className="h-10 w-28 bg-gray-300 text-white rounded-md transition hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-300"
                                    >
                                        Submit
                                    </button>
                                </form>
                                {errorMessage && <p className="text-red-600 text-sm mt-1">{errorMessage}</p>}
                                {errors.commentBody && <span>{errors.commentBody.message}</span>}
                                <button
                                    onClick={updateStudentHandler}
                                    className="h-10 w-28 mt-3 bg-lime-600 text-white rounded-md transition hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-lime-600"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    </td>
                </tr>
            )}


        </>
    );
};

export default StudentComponent;
