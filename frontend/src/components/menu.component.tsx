"use client";
import React, {FC} from 'react';
import {authService} from "@/services/auth.service";
import {usePathname, useRouter} from "next/navigation";
import Image from 'next/image';
import {useAppSelector} from "@/hooks/useAppSelector";
interface IProps {
    onCreateManager?: () => void;
}

const MenuComponent:FC<IProps> = ({onCreateManager}) => {
    const router = useRouter();
    const pathname = usePathname();
    const { manager, loading } = useAppSelector(state => state.managerStore);
    if (loading) {
        return <div>Loading...</div>;
    }
    if (!manager) {
        return <div>Failed to load manager</div>;
    }
    const logoutHandler = async() => {
        try{
             await authService.logout();
            router.push("/");
        }catch(e){
            console.error("Logout error:", e);
    }
    }
    const handleNavigation = () => {
        if (pathname === "/manager") {
            router.push("/adminPanel");
        } else {
            router.push("/manager");
        }
    };
    return (
        <div className="bg-lime-600 text-white px-6 py-1 flex justify-between items-center h-14">
            <div className="text-xl font-bold">Logo</div>
            <div className="flex items-center space-x-4">
                <span>{manager.name} {manager.surname}</span>
                {manager.role === 'admin' && onCreateManager && (
                    <button
                        onClick={onCreateManager}
                        className="bg-lime-700 px-3 py-1 rounded "
                    >
                        <Image
                            src="/images/image5.png"
                            alt="create"
                            width={32}
                            height={32}
                            className="w-8 h-8"
                        />
                    </button>
                )}
                {manager.role === 'admin' && (
                    <button
                    className="bg-lime-700 px-3 py-1 rounded "
                    onClick={handleNavigation}
                    >
                        <Image
                            src={
                                pathname === "/manager"
                                    ? "/images/image5.png"
                                    : "/images/image4.png"
                            }
                            alt="navigate"
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
                        src="/images/image3.png"
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