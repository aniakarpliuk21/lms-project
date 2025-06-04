"use client";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {managerValidator} from "@/validators/manager.validator";
import {authService} from "@/services/auth.service";
import {IManagerLogin} from "@/models/IManager";
import { useRouter } from 'next/navigation';


const LoginComponent = () => {
    const router = useRouter();
const {handleSubmit, register, formState:{errors,isValid}} = useForm<IManagerLogin>(
    {mode:"all",
        resolver:joiResolver(managerValidator.login)});
const [isAuthState, setIsAuthState] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const customHandler = async (formData: IManagerLogin) => {
        try {
            const isAuth =await authService.authentication(formData);

            setIsAuthState( isAuth );
            if (isAuth) {
                    router.push("/manager");
            } else {
                setErrorMessage("Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage("An error occurred while logging in.");
        }
    };
    return (
        <div className="flex h-screen items-center justify-center bg-lime-600">
            <div className="w-96 rounded-xl bg-white p-8 shadow-lg">
                <form onSubmit={handleSubmit(customHandler)}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-semibold">
                            Email
                        </label>
                            <input
                                type="email"
                                id="email"
                                placeholder={"Enter your email"} {...register("email")}
                                className="mt-1 w-full bg-gray-200 rounded-md border border-gray-200 p-2 focus:border-lime-600 focus:outline-none"
                            />
                        {errors.email && <span>{errors.email.message}</span>}
                    </div>
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
                    {isAuthState && (
                        <p className="mb-4 text-green-600 font-semibold">
                            Successfully authenticated!
                        </p>
                    )}

                    <button
                                className="w-full rounded-md bg-lime-600 p-2 text-white transition hover:bg-lime-600"
                                disabled={!isValid}
                            >Login</button>

                </form>
            </div>
        </div>
    );
};
export default LoginComponent;