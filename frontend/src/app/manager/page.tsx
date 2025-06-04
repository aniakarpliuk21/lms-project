"use client";
import React, {Suspense, useEffect, useState} from "react";
import {StudentListOrderEnum} from "@/enums/student-list-order.enum";
import {OrderEnum} from "@/enums/oreder.enum";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {useAppSelector} from "@/hooks/useAppSelector";
import {studentSliceActions} from "@/redux/slices/studentSlice/studentSlice";
import MenuComponent from "@/components/menu.component";
import StudentFilterComponent from "@/components/students/student-filter.component";
import StudentListComponent from "@/components/students/student-list.component";
import StudentPaginationComponent from "@/components/students/student.pagination.component";
import {groupSliceActions} from "@/redux/slices/groupSlice/groupSlice";
import {useRouter, useSearchParams} from "next/navigation";
import {managerSliceActions} from "@/redux/slices/managerSlice/managerSlice";


export default function ManagerPageWrapper() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ManagerPage/>
        </Suspense>
    );
}

const ManagerPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();
    const { total, limit, page: currentPage } = useAppSelector(state => state.studentStore.students);
    const pageParam = searchParams?.get("page") || "1";
    const sortFieldParam = searchParams?.get("sortField") || StudentListOrderEnum.CREATED_AT;
    const sortOrderParam = searchParams?.get("sortOrder") || OrderEnum.DESC;
    const [prevSortField, setPrevSortField] = useState<string | null>(null);
    const [prevSortOrder, setPrevSortOrder] = useState<string | null>(null);
    const [prevPage, setPrevPage] = useState<number | null>(null);
    const updateParams = (params: { page?: string; sortField?: string; sortOrder?: string }) => {
        if (!searchParams) return;
        const newParams = new URLSearchParams(searchParams.toString());

        if (params.page) newParams.set("page", params.page);
        if (params.sortField) newParams.set("sortField", params.sortField);
        if (params.sortOrder) newParams.set("sortOrder", params.sortOrder);

        router.push(`?${newParams.toString()}`);
    };
    const refreshStudents = () => {
        dispatch(studentSliceActions.getAllStudents({
            page: parseInt(pageParam),
            sortField: sortFieldParam,
            sortOrder: sortOrderParam
        }));
    };

    const onSortChange = (field: StudentListOrderEnum, order: OrderEnum) => {
        if (field !== sortFieldParam || order !== sortOrderParam) {
            updateParams({ sortField: field, sortOrder: order, page: "1" });
        }
    };

    const onPageChange = (newPage: number) => {
        if (newPage.toString() !== pageParam) {
            updateParams({ page: newPage.toString() });
        }
    };

    useEffect(() => {
        const page = parseInt(pageParam);
        const sortField = sortFieldParam;
        const sortOrder = sortOrderParam;

        if (
            page !== prevPage ||
            sortField !== prevSortField ||
            sortOrder !== prevSortOrder
        ) {
            dispatch(studentSliceActions.getAllStudents({ page, sortField, sortOrder }));
            setPrevSortField(sortField);
            setPrevSortOrder(sortOrder);
            setPrevPage(page);
        }
    }, [pageParam,prevPage, sortFieldParam, sortOrderParam, dispatch, prevSortField, prevSortOrder]);

    useEffect(() => {
        dispatch(groupSliceActions.getAllGroups());
        dispatch(managerSliceActions.getMe());
    }, [dispatch]);
    return (
        <div className="flex flex-col">
            <MenuComponent />
            <div className="flex-grow px-4 py-3">
                <div><StudentFilterComponent/></div>
                <div>
                    <StudentListComponent
                        onSortChange={onSortChange}
                        onUpdateSuccess={refreshStudents}
                    />
                </div>
            </div>
            <div className="fixed bottom-0 left-0 w-full bg-white shadow z-50 py-2">
                <StudentPaginationComponent
                    totalStudents={total}
                    limit={limit}
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                />
            </div>
        </div>
    );
};