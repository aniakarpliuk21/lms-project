"use client"
import React, {FC, useEffect, useState} from 'react';
import {IStudent, IStudentUpdate} from "@/models/IStudent";
import {useForm} from "react-hook-form";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {useAppSelector} from "@/hooks/useAppSelector";
import {groupSliceActions} from "@/redux/slices/groupSlice/groupSlice";
import {studentSliceActions} from "@/redux/slices/studentSlice/studentSlice";
import {joiResolver} from "@hookform/resolvers/joi";
import {studentValidator} from "@/validators/student.validator";
interface IProps {
    student: IStudent;
    onClose: () => void;
    onUpdateSuccess?: () => void;
}
const StudentUpdateComponent:FC<IProps> = ({student,onClose,onUpdateSuccess}) => {
    const {handleSubmit, register, setValue,reset,formState:{errors}} = useForm<IStudentUpdate>(
        {mode:"all",
            resolver:joiResolver(studentValidator.updateStudent)});
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [newGroupName, setNewGroupName] = useState('');
    const [createGroup,setCreateGroup] = useState(false);
    const dispatch = useAppDispatch();
    const groups = useAppSelector(state => state.groupStore.groups);
    useEffect(() => {
        if (student) {
            reset({
                name: student.name || "",
                surname: student.surname || "",
                email: student.email || "",
                phone: student.phone || "",
                course: student.course || "",
                course_format: student.course_format || "",
                age: student.age || 0,
                status: student.status || "",
                sum: student.sum || 0,
                alreadyPaid: student.alreadyPaid || 0,
                group: student.group || "",
                course_type: student.course_type || "",
            });
        }
    }, [student, reset]);
    const updateStudentHandler = async (formData: IStudentUpdate) => {
        try {
            const studentId = student._id;
            const dto = Object.fromEntries(
                Object.entries(formData).filter(([_, value]) =>
                    typeof value === "string"
                        ? value.trim() !== ""
                        : value !== null && value !== undefined
                )
            );
           dispatch(studentSliceActions.updateStudent({studentId, dto}));
            onClose();
            onUpdateSuccess?.();
        } catch (error) {
            console.error("Update student error:", error);
            setErrorMessage("An error occurred while updating student.");
        }
    };
    const createGroupHandler = async () => {
        try {
            const resultAction = await dispatch(groupSliceActions.createGroup(newGroupName));

            if (groupSliceActions.createGroup.fulfilled.match(resultAction)) {
                const newGroup = resultAction.payload;
                setValue("group", newGroup.name);
                setCreateGroup(false);
            } else {
                setErrorMessage("Failed to create group");
            }
        } catch (e) {
            console.error("Create group error", e);
            setErrorMessage("Something went wrong");
        }
    };
    return (
                <div className= "flex items-center justify-center">
                    <div className= "w-200 rounded-xl bg-white p-8 shadow-lg">
                        <form onSubmit={handleSubmit(updateStudentHandler)}>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="mb-4">
                                    <label htmlFor="group" className="block text-gray-700 font-semibold"
                                    >Group
                                    </label>
                                    {!createGroup ? (
                                    <div>
                                        <input
                                            list="group-options"
                                            {...register("group")}
                                            className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700"
                                        />
                                        <button
                                            type="button"
                                            className="rounded-md bg-lime-600 p-1/2 w-full text-white transition hover:bg-lime-700"
                                            onClick={() => setCreateGroup(true)}
                                        >
                                            ADD GROUP
                                        </button>
                                    </div>
                                    ) : (
                                        <div className="flex flex-col gap-2">
                                            <input
                                                type="text"
                                                value={newGroupName}
                                                onChange={(e) => setNewGroupName(e.target.value)}
                                                placeholder="Enter new group name"
                                                className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-600"
                                            />
                                            <div className="flex gap-2">
                                                <button
                                                    type="button"
                                                    disabled={!newGroupName.trim()}
                                                    className="w-full rounded-md bg-lime-600 p-1/2 text-white hover:bg-lime-700"
                                                    onClick={createGroupHandler}
                                                >
                                                    ADD
                                                </button>
                                                <button
                                                    type="button"
                                                    className="w-full rounded-md bg-lime-600 p-1/2 text-white hover:bg-lime-700"
                                                    onClick={() => {
                                                        setValue("group", newGroupName);
                                                        setCreateGroup(false);
                                                    }}
                                                >
                                                    SELECT
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    <datalist id="group-options">
                                        {groups
                                            .filter(group => group.students.length < 20)
                                            .map((group) => (
                                                <option key={group._id} value={group.name}/>
                                            ))}
                                    </datalist>
                                    {errors.group && <span>{errors.group.message}</span>}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="status" className="block text-gray-700 font-semibold">
                                        Status
                                    </label>
                                    <select id="status"
                                            {...register("status")}
                                            className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700"
                                    >
                                    <option value="">Select a status</option>
                                    <option value="In work">In work</option>
                                    <option value="New">New</option>
                                    <option value="Aggre">Aggre</option>
                                    <option value="Disaggre">Disaggre</option>
                                    <option value="Dubbing">Dubbing</option>
                                </select>
                                {errors.status && <span>{errors.status.message}</span>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700 font-semibold">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder={"Enter name"} {...register("name")}
                                    className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700"
                                />
                                {errors.name && <span>{errors.name.message}</span>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="sum" className="block text-gray-700 font-semibold">
                                    Sum
                                </label>
                                <input
                                    type="text"
                                    id="sum"
                                    placeholder={"Enter sum"} {...register("sum")}
                                    className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700"
                                />
                                {errors.sum && <span>{errors.sum.message}</span>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="surname" className="block text-gray-700 font-semibold">
                                    Surname
                                </label>
                                <input
                                    type="text"
                                    id="surname"
                                    placeholder={"Enter manager's surname"} {...register("surname")}
                                    className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700"
                                />
                                {errors.surname && <span>{errors.surname.message}</span>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="alreadyPaid" className="block text-gray-700 font-semibold">
                                    Already paid
                                </label>
                                <input
                                    type="text"
                                    id="alreadyPaid"
                                    placeholder={"Enter already paid"} {...register("alreadyPaid")}
                                    className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700"
                                />
                                {errors.alreadyPaid && <span>{errors.alreadyPaid.message}</span>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 font-semibold">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder={"Enter email"} {...register("email")}
                                    className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700"
                                />
                                {errors.email && <span>{errors.email.message}</span>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="course" className="block text-gray-700 font-semibold">
                                    Course
                                </label>
                                <select
                                    className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700"
                                    id="course"
                                    {...register("course")}>
                                    <option value="">Select a course</option>
                                    <option value="FS">FS</option>
                                    <option value="QACX">QACX</option>
                                    <option value="JCX">JCX</option>
                                    <option value="JSCX">JSCX</option>
                                    <option value="FE">FE</option>
                                    <option value="PCX">PCX</option>
                                </select>
                                {errors.course && <span>{errors.course.message}</span>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-gray-700 font-semibold">
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    id="phone"
                                    placeholder={"Enter phone"} {...register("phone")}
                                    className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700"
                                />
                                {errors.phone && <span>{errors.phone.message}</span>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="course_format" className="block text-gray-700 font-semibold">
                                    Course format
                                </label>
                                <select
                                    className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700"
                                    id="course_format"
                                    {...register("course_format")}>
                                    <option value="">Select a course format</option>
                                    <option value="static">static</option>
                                    <option value="online">online</option>
                                </select>
                                {errors.course_format && <span>{errors.course_format.message}</span>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="age" className="block text-gray-700 font-semibold">
                                    Age
                                </label>
                                <input
                                    type="text"
                                    id="age"
                                    placeholder={"Enter age"} {...register("age")}
                                    className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700"
                                />
                                {errors.age && <span>{errors.age.message}</span>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="course_type" className="block text-gray-700 font-semibold">
                                    Course type
                                </label>
                                <select
                                    className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700"
                                    id="course_type"
                                    {...register("course_type")}>
                                    <option value="">Select a course type</option>
                                    <option value="pro">pro</option>
                                    <option value="minimal">minimal</option>
                                    <option value="premium">premium</option>
                                    <option value="incubator">incubator</option>
                                    <option value="vip">vip</option>
                                </select>
                                {errors.course_type && <span>{errors.course_type.message}</span>}
                            </div>
                            </div>
                            {errorMessage && <p className="mb-4 text-red-500">{errorMessage}</p>}
                            <div className="w-full flex justify-end">
                                <button
                                    type="button"
                                    className="rounded-md bg-lime-600 p-2 m-1 w-20 text-white transition hover:bg-lime-700"
                                    onClick={onClose}
                                >CLOSE
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-lime-600 p-2 m-1 w-20 text-white transition hover:bg-lime-700"
                                >SUBMIT
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
    );
};

export default StudentUpdateComponent;