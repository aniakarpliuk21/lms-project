"use client"
import React, {useEffect} from 'react';
import Image from "next/image";
import {useAppSelector} from "@/hooks/useAppSelector";
import {useForm} from "react-hook-form";
import {IStudent, IStudentSearch} from "@/models/IStudent";
import debounce from "lodash.debounce";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {studentSliceActions} from "@/redux/slices/studentSlice/studentSlice";
import {useRouter} from "next/navigation";
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const StudentFilterComponent = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const {groups, loading} = useAppSelector(state => state.groupStore);
    const { register, watch, reset } = useForm<IStudentSearch>({ mode: "onChange" });
    const students = useAppSelector((state) => state.studentStore.students.data);
    const updateQueryParamsWithFilters = (filters: IStudentSearch) => {
        const params = new URLSearchParams();
        for (const [key, value] of Object.entries(filters)) {
            if (value !== "" && value !== undefined && value !== null) {
                params.set(key, String(value));
            }
        }
        router.push(`?${params.toString()}`);
    };
    const debouncedFilter = debounce((values: IStudentSearch) => {
            const manager = localStorage.getItem("manager");
            let managerId: string | null = null;
            if (manager) {
                try {
                    const managerData = JSON.parse(manager);
                    managerId = managerData._id || null;
                } catch (error) {
                    console.error("Failed to parse manager from localStorage", error);
                }
            }
            const filtered = Object.fromEntries(
                Object.entries(values)
                    .filter(([, v]) => v !== "" && v !== undefined && v !== null)
                    .map(([k, v]) => [k, typeof v === "string" ? v.trim() : v])
            );
            if (filtered.managerOnly === true || filtered.managerOnly === "true") {
                if (managerId) filtered.currentManagerId = managerId;
            } else {
                delete filtered.currentManagerId;
            }
            updateQueryParamsWithFilters(filtered);
            delete filtered.managerOnly;
            dispatch(studentSliceActions.setStudentFilter(filtered));
            dispatch(studentSliceActions.setPage(1));
        }, 500);
    useEffect(() => {
        const subscription = watch((values) => {
            debouncedFilter(values);
        });

        return () => {
            subscription.unsubscribe();
            debouncedFilter.cancel();
        };
    }, [watch, debouncedFilter]);

    const handleResetFilter = () => {
        reset();
        dispatch(studentSliceActions.setStudentFilter({}));
        dispatch(studentSliceActions.setPage(1));
    };

    const handleCreateExcelTable = async (students: IStudent[]) => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Students");

        worksheet.columns = [
            { header: "Name", key: "name", width: 20 },
            { header: "Surname", key: "surname", width: 20 },
            { header: "Email", key: "email", width: 30 },
            { header: "Phone", key: "phone", width: 20 },
            { header: "Course", key: "course", width: 15 },
            { header: "Course Format", key: "course_format", width: 15 },
            { header: "Course Type", key: "course_type", width: 15 },
            { header: "Group", key: "group", width: 15 },
            { header: "Age", key: "age", width: 10 },
            { header: "Sum", key: "sum", width: 10 },
            { header: "Already Paid", key: "alreadyPaid", width: 15 },
            { header: "Status", key: "status", width: 15 },
        ];

        students.forEach((student) => {
            worksheet.addRow(student);
        });

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        saveAs(blob, "students.xlsx");
    };

    return (
        <form>
            <div className="flex m-2">
                <div className="grid grid-cols-6 grid-rows-2 gap-4 w-330">
                    <input
                        type="text"
                        placeholder="Name"
                        {...register("name")}
                        className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700"
                    />
                    <input
                        type="text"
                        placeholder="Surname"
                        {...register("surname")}
                        className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700"
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        {...register("email")}
                        className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700"
                    />
                    <input
                        type="text"
                        placeholder="Phone"
                        {...register("phone")}
                        className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700"
                    />
                    <input
                        type="number"
                        placeholder="Age"
                        {...register("age")}
                        className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700"
                    />
                    <select
                            {...register("course")}
                            className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700">
                        <option value="">All courses</option>
                        <option value="FS">FS</option>
                        <option value="QACX">QACX</option>
                        <option value="JCX">JCX</option>
                        <option value="JSCX">JSCX</option>
                        <option value="FE">FE</option>
                        <option value="PCX">PCX</option>
                    </select>
                    <select
                            {...register("course_format")}
                            className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700">
                        <option value="">All format</option>
                        <option value="static">static</option>
                        <option value="online">online</option>
                    </select>
                    <select
                            {...register("course_type")}
                            className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700">
                        <option value="">All type</option>
                        <option value="pro">pro</option>
                        <option value="minimal">minimal</option>
                        <option value="premium">premium</option>
                        <option value="incubator">incubator</option>
                        <option value="vip">vip</option>
                    </select>
                    <select
                            {...register("status")}
                            className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700">
                        <option value="">All statuses</option>
                        <option value="In work">In work</option>
                        <option value="New">New</option>
                        <option value="Aggre">Aggre</option>
                        <option value="Disaggre">Disaggre</option>
                        <option value="Dubbing">Dubbing</option>
                    </select>

                    <select
                            {...register("group")}
                            className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700">
                        <option value="">All groups</option>
                        {loading ? (
                            <option disabled>Loading groups...</option>
                        ) : (
                            groups.map((group) => (
                                <option key={group._id} value={group.name}>
                                    {group.name}
                                </option>
                            ))
                        )}
                    </select>
                    <input
                        type="date"
                        placeholder="Start date"
                        {...register("startDate")}
                        className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700"
                    />
                    <input
                        type="date"
                        placeholder="End date"
                        {...register("endDate")}
                        className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700"
                    />
                </div>
                <div className="flex w-50 justify-center items-center">
                    <label className="flex  gap-2 h-8 items-center justify-center w-8 m-1">
                        <input
                            type="checkbox"
                            {...register("managerOnly")}
                            className="accent-green-600"
                        />
                        My
                    </label>
                    <button
                        type="button"
                        onClick={handleResetFilter}
                        className="bg-lime-600  m-1 w-8 h-8">
                        <Image src="/images/image6.png" alt="prev" width={10} height={10} className="w-6 h-6"/>
                    </button>
                    <button
                        type="button"
                        onClick={() => handleCreateExcelTable(students)}
                        className="bg-lime-600 m-1 w-8 h-8">
                        <Image src="/images/image7.png" alt="prev" width={10} height={10} className="w-6 h-6"/>
                    </button>
                </div>
            </div>
        </form>
    );
};

export default StudentFilterComponent;

