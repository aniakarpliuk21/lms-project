"use client"
import React from 'react';
import Image from "next/image";
import {useAppSelector} from "@/hooks/useAppSelector";
import {useForm} from "react-hook-form";
import {IStudentSearch} from "@/models/IStudent";

const StudentFilterComponent = () => {
    const {groups, loading} = useAppSelector(state => state.groupStore);
    const {register, getValues, reset} = useForm<IStudentSearch>({});
    const handleFilter = () => {
        const values = getValues();

        const filteredForm = Object.fromEntries(
            Object.entries(values).filter(
                ([, v]) => v !== "" && v !== undefined && v !== null
            )
        );
        console.log(filteredForm);
    };

    const handleResetFilter = () => {
        console.log("Reset filter");
        reset();
        handleFilter();

    };
    const handleCreateExelTable = () => {
        console.log("Exel file created");
    }
    return (
        <form>
            <div className="flex m-2">
                <div className="grid grid-cols-6 grid-rows-2 gap-4 w-330">
                    <input
                        type="text"
                        placeholder="Name"
                        {...register("name")}
                        onBlur={handleFilter}
                        className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700"
                    />
                    <input
                        type="text"
                        placeholder="Surname"
                        {...register("surname")}
                        onBlur={handleFilter}
                        className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700"
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        {...register("email")}
                        onBlur={handleFilter}
                        className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700"
                    />
                    <input
                        type="text"
                        placeholder="Phone"
                        {...register("phone")}
                        onBlur={handleFilter}
                        className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700"
                    />
                    <input
                        type="number"
                        placeholder="Age"
                        {...register("age")}
                        onBlur={handleFilter}
                        className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700"
                    />
                    <select
                            {...register("course")}
                            onChange={handleFilter}
                            className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700">
                        <option value="">All courses</option>
                        <option value="FS">FS</option>
                        <option value="QACX">QACX</option>
                        <option value="JCX">JCX</option>
                        <option value="JSCX">JSCX</option>
                        <option value="FE">FE</option>
                        <option value="PCX">PCX</option>
                    </select>
                    <select
                            {...register("course_format")}
                            onChange={handleFilter}
                            className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700">
                        <option value="">All format</option>
                        <option value="static">static</option>
                        <option value="online">online</option>
                    </select>
                    <select
                            {...register("course_type")}
                            onChange={handleFilter}
                            className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700">
                        <option value="">All type</option>
                        <option value="pro">pro</option>
                        <option value="minimal">minimal</option>
                        <option value="premium">premium</option>
                        <option value="incubator">incubator</option>
                        <option value="vip">vip</option>
                    </select>
                    <select
                            {...register("status")}
                            onChange={handleFilter}
                            className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700">
                        <option value="">All statuses</option>
                        <option value="In work">In work</option>
                        <option value="New">New</option>
                        <option value="Aggre">Aggre</option>
                        <option value="Disaggre">Disaggre</option>
                        <option value="Dubbing">Dubbing</option>
                    </select>

                    <select
                            {...register("group")}
                            onChange={handleFilter}
                            className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700">
                        <option value="">All groups</option>
                        {loading ? (
                            <option disabled>Loading groups...</option>
                        ) : (
                            groups.map((group) => (
                                <option key={group._id} value={group.name}>
                                    {group.name}
                                </option>
                            ))
                        )}
                    </select>
                    <input
                        type="date"
                        placeholder="Start date"
                        {...register("startDate")}
                        onChange={handleFilter}
                        className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700"
                    />
                    <input
                        type="date"
                        placeholder="End date"
                        {...register("endDate")}
                        onChange={handleFilter}
                        className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700"
                    />
                </div>
                <div className="flex w-50 justify-center items-center">
                    <label className="flex  gap-2 h-8 items-center justify-center w-8 m-1">
                        <input
                            type="checkbox"
                            {...register("managerOnly")}
                            onChange={handleFilter}
                            className="accent-green-600"
                        />
                        My
                    </label>
                    <button
                        type="button"
                        onClick={handleResetFilter}
                        className="bg-lime-600  m-1 w-8 h-8">
                        <Image src="/images/image6.png" alt="prev" width={10} height={10} className="w-6 h-6"/>
                    </button>
                    <button
                        type="button"
                        onClick={handleCreateExelTable}
                        className="bg-lime-600 m-1 w-8 h-8">
                        <Image src="/images/image7.png" alt="prev" width={10} height={10} className="w-6 h-6"/>
                    </button>
                </div>
            </div>
        </form>
    );
};

export default StudentFilterComponent;

