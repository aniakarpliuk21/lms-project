"use client";
import React, {FC, useEffect, useState} from 'react';
import {IManager} from "@/models/IManager";
import {managerService} from "@/services/manager.service";
import {passwordService} from "@/services/password.service";
import {studentService} from "@/services/student.service";
import {IStudentStatistics} from "@/models/IStudent";
interface IProps {
    manager: IManager;
}
const ManagerComponent:FC<IProps> = ({manager}) => {
    const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
    const [forgotPassword, setForgotPassword] = useState<boolean>(false);
    const [banManager, setBanManager] = useState<boolean>(manager.isBanned || false);
    const [unbanManager, setUnbanManager] = useState<boolean>(false);
    const [stats, setStats] = useState<IStudentStatistics | null>(null);
    const loggedManager = JSON.parse(localStorage.getItem("manager") || "null");
    useEffect(() => {
        const studentStatsByManagerId = async () => {
            try {
                const response = await studentService.getStudentStatistics(manager._id);
                setStats(response);
            } catch (e) {
                console.error("Error fetching manager statistics", e);
            }
        };
        studentStatsByManagerId();
    }, [manager._id]);
    const handleRecoveryPassword = async () => {
        try{
            const response = await passwordService.sendForgotPasswordEmail(manager.email)
            if(response){
                setForgotPassword(true)
                setTimeout(() => {
                    setIsEmailSent(false);
                }, 5000);
            }
        }catch (e) {
            console.error("Error sending forgot password email", e);
        }
    }
        const handleSendActivateEmail = async () =>{
            try{
                const response = await managerService.sendActivateEmail(manager.email)
                if(response){
                    setIsEmailSent(true);
                    setTimeout(() => {
                        setIsEmailSent(false);
                    }, 3000);
                }

            }catch (e) {
                console.error("Error sending activate email", e);
            }
        }
        const handleBanManager = async () => {
        try{
            const response = await managerService.banManager(manager._id)
            if(response){
                setBanManager(true)
            }
        }catch (e) {
            console.error("Error ban manager", e);
        }
        }
    const handleUnbanManager = async () => {
        try{
            const response = await managerService.unbanManager(manager._id)
            if(response){
                setBanManager(false)
                setUnbanManager(true)
                setTimeout(() => {
                    setUnbanManager(false);
                }, 5000);
            }
        }catch (e) {
            console.error("Error unban manager", e);
        }
    }
    const isSelf = loggedManager?._id === manager._id;
    return (
        <div className="border border-lime-700 rounded-md p-4 mb-4">
            <div className="flex flex-wrap gap-6 items-start">
                <div className="min-w-[200px]">
                    <div className="text-sm mb-1">id: {manager.id}</div>
                    <div className="text-sm mb-1">email: {manager.email}</div>
                    <div className="text-sm mb-1">name: {manager.name}</div>
                    <div className="text-sm mb-1">surname: {manager.surname}</div>
                    <div className="text-sm mb-1">
                        is_active: {manager.isVerified !== undefined ? String(manager.isVerified) : 'undefined'}
                    </div>
                    <div className="text-sm mb-1">
                        last
                        login: {manager.lastVisit ? new Date(manager.lastVisit).toLocaleDateString('uk-UA') : 'null'}
                    </div>
                </div>
                {stats && (
                    <div className="min-w-[200px] text-sm text-lime-800">
                        <div><strong>Total:</strong> {stats.total}</div>
                        {stats["New"] > 0 && <div><strong>New:</strong> {stats["New"]}</div>}
                        {stats["In work"] > 0 && <div><strong>In work:</strong> {stats["In work"]}</div>}
                        {stats["Aggre"] > 0 && <div><strong>Aggre:</strong> {stats["Aggre"]}</div>}
                        {stats["Disaggre"] > 0 && <div><strong>Disaggre:</strong> {stats["Disaggre"]}</div>}
                        {stats["Dubbing"] > 0 && <div><strong>Dubbing:</strong> {stats["Dubbing"]}</div>}
                    </div>
                )}
                <div className="flex-1 flex items-center">
                    <div className="flex flex-wrap gap-2">
                        {manager.isVerified && (
                            <button
                                onClick={handleRecoveryPassword}
                                disabled={forgotPassword}
                                className="bg-lime-600 hover:bg-green-700 text-white px-3 py-1 text-sm rounded"
                            >
                                RECOVERY PASSWORD
                            </button>
                        )}
                        {!manager.isVerified && (
                            <button
                                onClick={handleSendActivateEmail}
                                className="bg-lime-600 hover:bg-green-700 text-white px-3 py-1 text-sm rounded"
                            >
                                ACTIVATE
                            </button>
                        )}
                        {!isSelf && (
                            <>
                                <button
                                    onClick={handleBanManager}
                                    disabled={banManager}
                                    className={`px-3 py-1 text-sm rounded text-white ${
                                        banManager ? 'bg-gray-400 cursor-not-allowed' : 'bg-lime-600 hover:bg-lime-700'
                                    }`}
                                >
                                    BAN
                                </button>
                                <button
                                    onClick={handleUnbanManager}
                                    disabled={!banManager || unbanManager}
                                    className={`px-3 py-1 text-sm rounded text-white ${
                                        !banManager ? 'bg-gray-400 cursor-not-allowed' : 'bg-lime-600 hover:bg-lime-700'
                                    }`}
                                >
                                    UNBAN
                                </button>
                            </>
                        )}
                        {isEmailSent && (
                            <p className="text-green-600 font-semibold w-full">Email has been sent successfully!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagerComponent;