"use client";
import React, {FC, useEffect, useState} from 'react';
import {IManager} from "@/models/IManager";
import {authService} from "@/services/auth.service";
import {useRouter} from "next/navigation";
import Image from 'next/image';
interface IProps {
    onCreateManager: () => void;
}

const MenuComponent:FC<IProps> = ({onCreateManager}) => {
    const router = useRouter();
    const [manager, setManager] = useState<IManager | null>(null);
    useEffect(() => {
        const storManager = localStorage.getItem('manager');
        if (storManager) {
            setManager(JSON.parse(storManager));
        }
    }, []);
    if (!manager) {
        return <div>Loading...</div>;
    }
    const logoutHandler = async() => {
        try{
             await authService.logout();
             console.log("Logged out");
            router.push("/");
        }catch(e){
            console.error("Logout error:", e);
    }
    }
    return (
        <div className="bg-lime-600 text-white px-6 py-3 flex justify-between items-center">
            <div className="text-xl font-bold">Logo</div>
            <div className="flex items-center space-x-4">
                <span>{manager.name}</span>
                {manager.role === 'admin' && (
                    <button
                        onClick={onCreateManager}
                        className="bg-lime-700 px-3 py-1 rounded "
                    >
                        <Image
                            src="/images/image1.png"
                            alt="create"
                            width={32}
                            height={32}
                            className="w-8 h-8"
                        />
                    </button>
                )}
                <button
                    className="bg-lime-700 px-3 py-1 rounded"
                    onClick={logoutHandler}
                >
                    <Image
                        src="/images/image2.png"
                        alt="logout"
                        width={32}
                        height={32}
                        className="w-8 h-8"
                    />
                </button>
            </div>
        </div>
    );
}

export default MenuComponent;