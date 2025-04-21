"use client";
import React, {FC, useEffect, useState} from 'react';
import StudentStatisticsComponent from "@/components/student-statistics.component";
import CreateManagerComponent from "@/components/create-manager.component";
import MenuComponent from "@/components/menu.component";
import {IManager} from "@/models/IManager";
import ManagerListComponent from "@/components/manager-list.component";
import {managerService} from "@/services/manager.service";
import PaginationComponent from "@/components/pagination.component";
import {useRouter, useSearchParams} from "next/navigation";

const AdminPage:FC = () => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [managers, setManagers] = useState<IManager[]>([]);
    const [totalManager, setTotalManager] = useState<number>(1);
    const [limit,setLimit] = useState<number>(10);
    const searchParams = useSearchParams();
    const page = searchParams.get('page') || '1';
    useEffect(() => {
        const getManagers = async () => {
            try {
                const response = await managerService.getAllManagers(+page);
                if(response){
                    setManagers(response.data);
                    setTotalManager(response.total);
                    setLimit(response.limit);
                }
            } catch (error) {
                console.error("Error by manager list", error);
                router.push("/");
            }
        };
        getManagers();
    }, [page]);
    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };
    const handleManagerCreated = (newManager: IManager) => {
        setManagers(prev => [newManager, ...prev]);
    };
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
                <ManagerListComponent managers={managers}/>
                <PaginationComponent totalManager={totalManager} limit={limit}/>
            </div>
        </div>
    );
};

export default AdminPage;