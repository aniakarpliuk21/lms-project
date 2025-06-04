"use client";
import React, {Suspense, useCallback, useEffect, useState} from "react";
import {useAppSelector} from "@/hooks/useAppSelector";
import MenuComponent from "@/components/menu.component";
import StudentStatisticsComponent from "@/components/students/student-statistics.component";
import CreateManagerComponent from "@/components/manager/create-manager.component";
import ManagerListComponent from "@/components/manager/manager-list.component";
import ManagerPaginationComponent from "@/components/manager/manager.pagination.component";
import {studentSliceActions} from "@/redux/slices/studentSlice/studentSlice";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {managerSliceActions} from "@/redux/slices/managerSlice/managerSlice";
import {useAppSearchParams} from "@/hooks/useAppSearchParams";

export default function AdminPanelPageWrapper() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AdminPage />
        </Suspense>
    );
}
const AdminPage = () => {
    const dispatch = useAppDispatch();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { getPageParam } = useAppSearchParams();
    const page = parseInt(getPageParam()) || 1;
    const { total, limit, order, orderBy } = useAppSelector(state => state.managerStore.managers);
    useEffect(() => {
        dispatch(studentSliceActions.getStudentStatistics());
        dispatch(managerSliceActions.getAllManagers({ page, search: "", limit, order,orderBy}));
    }, [dispatch, page, limit, order, orderBy]);
    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };
    const handleManagerCreated = useCallback(() => {
        dispatch(managerSliceActions.getAllManagers({ page, search: "", limit, order, orderBy }));
    }, [dispatch, page, limit, order, orderBy]);
    return (
        <div className="min-h-screen bg-white">
            <MenuComponent onCreateManager={handleModalOpen} />
            <div className="p-6">
                <div className="flex justify-evenly items-center mb-4">
                    <button
                        onClick={handleModalOpen}
                        className="bg-lime-600 text-white px-4 py-2 rounded hover:bg-lime-700 transition"
                    >
                        CREATE
                    </button>
                    <StudentStatisticsComponent/>
                </div>
                <CreateManagerComponent
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    onManagerCreated={handleManagerCreated}
                />
                <ManagerListComponent/>
                <ManagerPaginationComponent totalManager={total} limit={limit}/>
            </div>
        </div>
    );
};
