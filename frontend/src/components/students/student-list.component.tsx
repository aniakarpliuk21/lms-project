"use client";
import {StudentListOrderEnum} from "@/enums/student-list-order.enum";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {useAppSelector} from "@/hooks/useAppSelector";
import {FC, useEffect, useState} from "react";
import {IStudent} from "@/models/IStudent";
import {OrderEnum} from "@/enums/oreder.enum";
import StudentComponent from "@/components/students/student.component";
import StudentUpdateComponent from "@/components/students/student-update.component";
import {managerSliceActions} from "@/redux/slices/managerSlice/managerSlice";
interface Props {
    onSortChange: (field: StudentListOrderEnum, order: OrderEnum) => void;
    onUpdateSuccess: () => void;
}
const headerConfigs = [
    { label: "ID", field: StudentListOrderEnum.ID },
    { label: "Name", field: StudentListOrderEnum.NAME },
    { label: "Surname", field: StudentListOrderEnum.SURNAME },
    { label: "Email", field: StudentListOrderEnum.EMAIL },
    { label: "Phone", field: StudentListOrderEnum.PHONE },
    { label: "Age", field: StudentListOrderEnum.AGE },
    { label: "Course", field: StudentListOrderEnum.COURSE },
    { label: "Course format", field: StudentListOrderEnum.COURSE_FORMAT },
    { label: "Course type", field: StudentListOrderEnum.COURSE_TYPE },
    { label: "Status", field: StudentListOrderEnum.STATUS },
    { label: "Sum", field: StudentListOrderEnum.SUM },
    { label: "Already Paid", field: StudentListOrderEnum.ALREADY_PAID },
    { label: "Group", field: StudentListOrderEnum.GROUP },
    { label: "Created At", field: StudentListOrderEnum.CREATED_AT },
    { label: "Manager", field: StudentListOrderEnum.MANAGER },
];

const StudentListComponent:FC<Props> = ({ onSortChange, onUpdateSuccess }) => {
    const dispatch = useAppDispatch();
    const {
        students: { data: students, order: sortOrder, orderBy: sortField },
        loading,
        error,
    } = useAppSelector((state) => state.studentStore);

    const [studentToUpdate, setStudentToUpdate] = useState<IStudent | null>(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

    useEffect(() => {
        dispatch(managerSliceActions.getAllManagersFull());
    }, [dispatch]);

    const handleSort = (field: StudentListOrderEnum) => {
        const newOrder =
            field === sortField
                ? sortOrder === OrderEnum.ASC
                    ? OrderEnum.DESC
                    : OrderEnum.ASC
                : OrderEnum.ASC;
        onSortChange(field, newOrder);
    };

    const openModal = (student: IStudent) => {
        setStudentToUpdate(student);
        setIsUpdateModalOpen(true);
    };

    const closeModal = () => {
        setStudentToUpdate(null);
        setIsUpdateModalOpen(false);
    };

    const handleToggleStudentRow = (studentId: string) => {
        setSelectedStudentId((prev) => (prev === studentId ? null : studentId));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {typeof error === 'string' ? error : (error as Error).message}</div>;

    return (
        <>
            <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-lime-600 text-white font-semibold">
                <tr>
                    {headerConfigs.map(({label, field}) => (
                        <th
                            key={field}
                            onClick={() => handleSort(field)}
                            className="px-2 py-1 cursor-pointer whitespace-nowrap"
                        >
                            {label}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {students.map((student, index) => (
                    <StudentComponent
                        rowClass={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        key={student._id}
                        student={student}
                        onOpenModal={openModal}
                        isSelected={selectedStudentId === student._id}
                        onToggle={() => handleToggleStudentRow(student._id)}
                    />
                ))}
                </tbody>
            </table>

            {isUpdateModalOpen && studentToUpdate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <StudentUpdateComponent
                        student={studentToUpdate}
                        onClose={closeModal}
                        onUpdateSuccess={onUpdateSuccess}
                    />
                </div>
            )}
        </>
    );
};

export default StudentListComponent;
