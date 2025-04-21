"use client";
import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {useRouter, useSearchParams} from "next/navigation";
import {IForgotPassword, IForgotPasswordSet} from "@/models/IPassword";
import {passwordValidator} from "@/validators/password.validator";
import {passwordService} from "@/services/password.service";

const
    RestorePasswordPage = () => {
        const {handleSubmit, register, formState:{errors,isValid}} = useForm<IForgotPassword>(
            {mode:"all",
                resolver:joiResolver(passwordValidator.forgotPassword)});
        const [errorMessage, setErrorMessage] = useState<string | null>(null);
        const searchParams = useSearchParams();
        const token = searchParams.get("token");
        const router = useRouter();
            const customHandler = async (formData: IForgotPassword) => {
                    if(token) {
                        console.log(token);
                        try {
                            const dto:IForgotPasswordSet = {
                                password: formData.password,
                                token
                            }
                            console.log(dto);
                            const response = await passwordService.forgotPasswordSet(dto);
                            console.log(response);
                            if (response) {
                                console.log(response);
                                router.push("/");
                            }
                        } catch (e) {
                            setErrorMessage("Failed to set password");
                        }
                    }
            }
        return (
            <div className="flex h-screen items-center justify-center bg-lime-600">
                <div className="w-96 rounded-xl bg-white p-8 shadow-lg">
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
                            {errorMessage && <p className="mb-4 text-red-500">{errorMessage}</p>}
                            <button
                                className="w-full rounded-md bg-lime-600 p-2 text-white transition hover:bg-lime-600"
                                disabled={!isValid}
                            >Сhange password
                            </button>
                        </form>
                </div>
            </div>
        );
    };

export default RestorePasswordPage;