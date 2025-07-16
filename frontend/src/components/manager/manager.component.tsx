import React, {FC, useState} from 'react';
import {IManager} from "@/models/IManager";
import {managerService} from "@/services/manager.service";
import {passwordService} from "@/services/password.service";
interface IProps {
    manager: IManager;
}
const ManagerComponent:FC<IProps> = ({manager}) => {
    const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
    const [forgotPassword, setForgotPassword] = useState<boolean>(false);
    const [banManager, setBanManager] = useState<boolean>(manager.isBanned || false);
    const [unbanManager, setUnbanManager] = useState<boolean>(false);
    const loggedManager = JSON.parse(localStorage.getItem("manager") || "null");
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
        <div className="border border-lime-700 rounded-md p-3 mb-4 flex justify-between flex-wrap">
        <div>
            <div className="text-sm mb-1">id: {manager.id}</div>
            <div className="text-sm mb-1">email: {manager.email}</div>
            <div className="text-sm mb-1">name: {manager.name}</div>
            <div className="text-sm mb-1">surname: {manager.surname}</div>
            <div className="text-sm mb-1">is_active: {manager.isVerified !== undefined ? String(manager.isVerified) : 'undefined'}</div>
            <div className="text-sm mb-1">last login:{manager.lastVisit ? new Date(manager.lastVisit).toLocaleDateString('uk-UA')  : 'null'}</div>
        </div>
            <div><span className="text-sm font-semibold">total: 0</span></div>
            <div>
                {manager.isVerified && (
                    <button
                        onClick={handleRecoveryPassword}
                        disabled={forgotPassword}
                        className="bg-lime-600 hover:bg-green-700 text-white px-3 py-1 text-sm mx-1 rounded"
                    >
                        RECOVERY PASSWORD
                    </button>
                )}
                {!manager.isVerified && (
                        <button
                            onClick={handleSendActivateEmail}
                            className="bg-lime-600 hover:bg-green-700 text-white px-3 py-1 text-sm mx-1 rounded">
                            ACTIVATE
                        </button>
                    )
                }
                {!isSelf && (
                    <>
                <button
                    onClick={handleBanManager}
                    disabled={banManager}
                    className={`px-3 py-1 text-sm mx-1 rounded text-white ${
                        banManager ? 'bg-gray-400 cursor-not-allowed' : 'bg-lime-600 hover:bg-lime-700'
                    }`}
                >BAN
                </button>
                <button
                    onClick={handleUnbanManager}
                    disabled={!banManager || unbanManager}
                    className={`px-3 py-1 text-sm mx-1 rounded text-white ${
                        !banManager ? 'bg-gray-400 cursor-not-allowed' : 'bg-lime-600 hover:bg-lime-700'
                    }`}
                >UNBAN
                </button>
                    </>
                )}
                {isEmailSent && (
                    <p className="text-green-600 font-semibold mt-2">Email has been sent successfully!</p>
                )}
            </div>
        </div>
            );
            };

            export default ManagerComponent;