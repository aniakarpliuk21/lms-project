"use client";
import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {useRouter, useSearchParams} from "next/navigation";
import {IPasswordCreate} from "@/models/IPassword";
import {passwordValidator} from "@/validators/password.validator";
import {authService} from "@/services/auth.service";
import {passwordService} from "@/services/password.service";

const ActivateManagerPage = () => {
    const {handleSubmit, register, formState:{errors,isValid}} = useForm<IPasswordCreate>(
        {mode:"all",
            resolver:joiResolver(passwordValidator.create)});
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isVerifyState, setIsVerifyState] = useState<boolean>(false);
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
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

            }
        }
        isVerify();
    }, [token]);
    const customHandler = async (formData: IPasswordCreate) => {
        console.log(formData)
        try {
            const response = await passwordService.createPassword(formData.password);
            console.log(response);
            if(response){
                console.log(response);
                router.push("/");
            }
        } catch (e) {
            setErrorMessage("Failed to set password");
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

            export default ActivateManagerPage;