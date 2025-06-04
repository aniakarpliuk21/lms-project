"use client";
import React from 'react';
import ManagerComponent from "@/components/manager/manager.component";
import {useAppSelector} from "@/hooks/useAppSelector";
const ManagerListComponent = () => {
    const { data: managers } = useAppSelector(state => state.managerStore.managers);
    return (
        <div>
            {managers.length === 0 && <p className="text-center">No managers found.</p>}
            {
                managers.map(manager => <ManagerComponent manager={manager} key={manager._id}/>)
            }
        </div>
    );
};

export default ManagerListComponent;