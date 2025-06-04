"use client"
import React from 'react';
import Image from "next/image";
import {useAppSelector} from "@/hooks/useAppSelector";

const StudentFilterComponent = () => {
    const {groups, loading} = useAppSelector(state => state.groupStore);
        return (
            <div className="flex m-2">
                <div className="grid grid-cols-6 grid-rows-2 gap-4 w-330">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700"
                    />
                    <input
                        type="text"
                        name="surname"
                        placeholder="Surname"
                        className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700"
                    />
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700"
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700"
                    />
                    <input
                        type="number"
                        name="age"
                        placeholder="Age"
                        className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700"
                    />
                    <select name="course"
                            className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700">
                        <option value="">All courses</option>
                        <option value="FS">FS</option>
                        <option value="QACX">QACX</option>
                        <option value="JCX">JCX</option>
                        <option value="JSCX">JSCX</option>
                        <option value="FE">FE</option>
                        <option value="PCX">PCX</option>
                    </select>
                    <select name="course_format"
                            className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700">
                        <option value="">All format</option>
                        <option value="static">static</option>
                        <option value="online">online</option>
                    </select>
                    <select name="course_type"
                            className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700">
                        <option value="">All type</option>
                        <option value="pro">pro</option>
                        <option value="minimal">minimal</option>
                        <option value="premium">premium</option>
                        <option value="incubator">incubator</option>
                        <option value="vip">vip</option>
                    </select>
                    <select name="status"
                            className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700">
                        <option value="">All statuses</option>
                        <option value="In work">In work</option>
                        <option value="New">New</option>
                        <option value="Aggre">Aggre</option>
                        <option value="Disaggre">Disaggre</option>
                        <option value="Dubbing">Dubbing</option>
                    </select>

                    <select name="group"
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
                        name="startDate"
                        placeholder="Start date"
                        className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700"
                    />
                    <input
                        type="date"
                        name="endDate"
                        placeholder="End date"
                        className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-lime-600 text-gray-700"
                    />
                </div>
                <div className="flex w-50 justify-center items-center">
                    <label className="flex  gap-2 h-8 items-center justify-center w-8 m-1">
                        <input
                            type="checkbox"
                            name="managerOnly"
                            className="accent-green-600"
                        />
                        My
                    </label>
                    <button className="bg-lime-600  m-1 w-8 h-8">
                        <Image src="/images/image6.png" alt="prev" width={10} height={10} className="w-6 h-6"/>
                    </button>
                    <button className="bg-lime-600 m-1 w-8 h-8">
                        <Image src="/images/image7.png" alt="prev" width={10} height={10} className="w-6 h-6"/>
                    </button>
                </div>
            </div>
        );
};

export default StudentFilterComponent;

