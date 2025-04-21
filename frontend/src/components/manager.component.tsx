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
    const hundleRecoveryPassword = async () => {
        try{
            const responce = await passwordService.sendForgotPasswordEmail(manager.email)
            if(responce){
                setForgotPassword(true)
                setTimeout(() => {
                    setIsEmailSent(false);
                }, 3000);
            }
        }catch (e) {
            console.error("Error sending forgot password email", e);
        }
    }
        const hundleSendActivateEmail = async () =>{
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
        const hundleBanManager = async () => {
        try{
            const response = await managerService.banManager(manager._id)
            if(response){
                setBanManager(true)
            }
        }catch (e) {
            console.error("Error ban manager", e);
        }
        }
    const hundleUnbanManager = async () => {
        try{
            const response = await managerService.unbanManager(manager._id)
            if(response){
                setBanManager(false)
                setUnbanManager(true)
            }
        }catch (e) {
            console.error("Error unban manager", e);
        }
    }

    return (
        <div className="border border-lime-700 rounded-md p-3 mb-4 flex justify-between flex-wrap">
        <div>
            <div className="text-sm mb-1">id: {manager._id}</div>
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
                        onClick={hundleRecoveryPassword}
                        className="bg-lime-600 hover:bg-green-700 text-white px-3 py-1 text-sm mx-1 rounded"
                    >
                        RECOVERY PASSWORD
                    </button>
                )}
                {!manager.isVerified && (
                        <button
                            onClick={hundleSendActivateEmail}
                            className="bg-lime-600 hover:bg-green-700 text-white px-3 py-1 text-sm mx-1 rounded">
                            ACTIVATE
                        </button>
                    )
                }
                <button
                    onClick={hundleBanManager}
                    disabled={banManager}
                    className={`px-3 py-1 text-sm mx-1 rounded text-white ${
                        banManager ? 'bg-gray-400 cursor-not-allowed' : 'bg-lime-600 hover:bg-lime-700'
                    }`}
                >BAN
                </button>
                <button
                    onClick={hundleUnbanManager}
                    disabled={!banManager}
                    className={`px-3 py-1 text-sm mx-1 rounded text-white ${
                        !banManager ? 'bg-gray-400 cursor-not-allowed' : 'bg-lime-600 hover:bg-lime-700'
                    }`}
                >UNBAN
                </button>
            </div>
        </div>
            );
            };

            export default ManagerComponent;