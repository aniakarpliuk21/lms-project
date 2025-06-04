"use client";
import React, {FC, useState} from 'react';
import {useForm} from "react-hook-form";
import {IManager, IManagerCreate} from "@/models/IManager";
import {joiResolver} from "@hookform/resolvers/joi";
import {managerValidator} from "@/validators/manager.validator";
import {managerService} from "@/services/manager.service";

export interface IProps {
    isOpen: boolean;
    onClose: () => void;
    onManagerCreated: (manager: IManager) => void;

}
const CreateManagerComponent:FC<IProps> = ({isOpen,onClose, onManagerCreated}) => {
    const {handleSubmit, register, formState:{errors,isValid}} = useForm<IManagerCreate>(
        {mode:"all",
            resolver:joiResolver(managerValidator.createManager)});
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const customHandler = async (formData: IManagerCreate) => {
        try {
            const newManager: IManager = await managerService.createManager(formData);
            onManagerCreated(newManager);
            onClose();
        } catch (error) {
            console.error("Create manager error:", error);
            setErrorMessage("An error occurred while creating the manager.");
        }
    };
    return (
        <>
        {isOpen && (
            <div className= "flex items-center justify-center">
        <div className= "w-96 rounded-xl bg-white p-8 shadow-lg">
            <form onSubmit={handleSubmit(customHandler)}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-semibold">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder={"Enter manager's email"} {...register("email")}
                        className="mt-1 w-full bg-gray-200 rounded-md border border-gray-200 p-2 focus:border-lime-600 focus:outline-none"
                    />
                    {errors.email && <span>{errors.email.message}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-semibold">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        placeholder={"Enter manager's name"} {...register("name")}
                        className="mt-1 w-full bg-gray-200 rounded-md border border-gray-200 p-2 focus:border-lime-600 focus:outline-none"
                    />
                    {errors.name && <span>{errors.name.message}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="surname" className="block text-gray-700 font-semibold">
                        Surname
                    </label>
                    <input
                        type="text"
                        id="surname"
                        placeholder={"Enter manager's surname"} {...register("surname")}
                        className="mt-1 w-full bg-gray-200 rounded-md border border-gray-200 p-2 focus:border-lime-600 focus:outline-none"
                    />
                    {errors.surname && <span>{errors.surname.message}</span>}
                </div>
                {errorMessage && <p className="mb-4 text-red-500">{errorMessage}</p>}
                <div className="w-full flex justify-evenly">
                    <button
                        className="rounded-md bg-lime-600 p-2 w-30 text-white transition hover:bg-lime-600"
                        type="button"
                        onClick={onClose}
                    >Cancel
                    </button>
                    <button
                        className="rounded-md bg-lime-600 p-2 w-30 text-white transition hover:bg-lime-600"
                        disabled={!isValid}
                    >Create
                    </button>
                </div>

            </form>
        </div>
        </div>
        )}
        </>
    );
};

export default CreateManagerComponent;