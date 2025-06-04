"use client";
import React, {Suspense, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {IPasswordCreate} from "@/models/IPassword";
import {joiResolver} from "@hookform/resolvers/joi";
import {passwordValidator} from "@/validators/password.validator";
import {useAppSearchParams} from "@/hooks/useAppSearchParams";
import {useRouter} from "next/navigation";
import {authService} from "@/services/auth.service";
import {passwordService} from "@/services/password.service";


export default function ActivatePageWrapper() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ActivatePage />
        </Suspense>
    );
}
const ActivatePage = () => {
    const {handleSubmit, register, formState:{errors,isValid}} = useForm<IPasswordCreate>(
        {mode:"all",
            resolver:joiResolver(passwordValidator.create)});
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isVerifyState, setIsVerifyState] = useState<boolean>(false);
    const { getParam } = useAppSearchParams();
    const token = getParam("token");
    const router = useRouter();
    useEffect(() => {
        const isVerify = async () => {
            try{
                if(token){
                    const response = await authService.verify(token);
                    if(response){
                        setIsVerifyState(true);
                    }
                }
            }catch (e) {
                console.error("Error verifying token", e);
            }
        }
        isVerify();
    }, [token]);
    const customHandler = async (formData: IPasswordCreate) => {
        try {
            const response = await passwordService.createPassword(formData.password);
            if(response){
                router.push("/");
            }
        } catch (e) {
            setErrorMessage(`Failed to set password ${e}`);
        }
    }
    return (
        <div className="flex h-screen items-center justify-center bg-lime-600">
            <div className="w-96 rounded-xl bg-white p-8 shadow-lg">
                {!isVerifyState ? (
                    <p>Token verification...</p>
                ) : (
                    <form onSubmit={handleSubmit(customHandler)}>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 font-semibold">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder={"Enter your password"} {...register("password")}
                                className="mt-1 w-full bg-gray-200 rounded-md border border-gray-200 p-2 focus:border-lime-600 focus:outline-none"
                            />
                            {errors.password && <span>{errors.password.message}</span>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold">
                                Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder={"Enter your password"} {...register("confirmPassword")}
                                className="mt-1 w-full bg-gray-200 rounded-md border border-gray-200 p-2 focus:border-lime-600 focus:outline-none"
                            />
                            {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
                        </div>
                        {errorMessage && <p className="mb-4 text-red-500">{errorMessage}</p>}
                        <button
                            className="w-full rounded-md bg-lime-600 p-2 text-white transition hover:bg-lime-600"
                            disabled={!isValid}
                        >ACTIVATE
                        </button>
                    </form>)}
            </div>
        </div>
    );
};