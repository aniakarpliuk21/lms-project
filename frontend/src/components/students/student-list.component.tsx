"use client";
import React, {FC, useEffect, useState} from 'react';
import { IStudent } from "@/models/IStudent";
import { StudentListOrderEnum } from "@/enums/student-list-order.enum";
import { OrderEnum } from "@/enums/oreder.enum";
import StudentComponent from "@/components/students/student.component";
import StudentUpdateComponent from "@/components/students/student-update.component";
import {useAppSelector} from "@/hooks/useAppSelector";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {managerSliceActions} from "@/redux/slices/managerSlice/managerSlice";

type Props = {
    onSortChange: (field: StudentListOrderEnum, order: OrderEnum) => void;
    onUpdateSuccess: () => void;
};

const StudentListComponent: FC<Props> = ({onSortChange,onUpdateSuccess}) => {
    const dispatch = useAppDispatch();
    const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
    const [studentToUpdate, setStudentToUpdate] = useState<IStudent | null>(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const {
        data: students,
        order: sortOrder,
        orderBy: sortField
    } = useAppSelector(state => state.studentStore.students);
    useEffect(() => {
        dispatch(managerSliceActions.getAllManagersFull());
    }, [dispatch]);
    const {loading, error} = useAppSelector(state => state.studentStore);
    const handleSort = (field: StudentListOrderEnum) => {
        if (field === sortField) {
            const newOrder = sortOrder === OrderEnum.ASC ? OrderEnum.DESC : OrderEnum.ASC;
            onSortChange(field, newOrder);
        } else {
            onSortChange(field, OrderEnum.ASC);
        }
    };
    const openModal = (student: IStudent) => {
        setStudentToUpdate(student);
        setIsUpdateModalOpen(true);
    };

    const closeModal = () => {
        setStudentToUpdate(null);
        setIsUpdateModalOpen(false);
    };
    if (loading) {
        return (
            <div className="flex justify-center items-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-lime-500"></div>
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <>
        <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-lime-600 text-white font-semibold">
            <tr>
                {[
                    "ID", "Name", "Surname", "Email", "Phone", "Age", "Course", "Course format",
                    "Course type", "Status", "Sum", "Already Paid", "Group", "Created At", "Manager"
                ].map((header, i) => (
                    <th
                        key={i}
                        onClick={() => handleSort(Object.values(StudentListOrderEnum)[i])}
                        className="px-2 py-1 cursor-pointer whitespace-nowrap"
                    >
                        {header}
                    </th>
                ))}
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
            {students.map((student, index) => (
                <StudentComponent
                    key={student._id}
                    student={student}
                    rowClass={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    isSelected={selectedStudentId === student._id}
                    onToggle={() =>
                        setSelectedStudentId((prev) =>
                            prev === student._id ? null : student._id
                        )
                    }
                    onOpenModal={openModal}
                />
            ))}
            </tbody>
        </table>
    {isUpdateModalOpen && studentToUpdate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <StudentUpdateComponent
                student={studentToUpdate}
                onClose={() => {
                    closeModal();
                    onUpdateSuccess();
                }}
            />
        </div>
    )}
        </>
    );
};

export default StudentListComponent;
