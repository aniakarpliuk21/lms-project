"use client";
import React from 'react';
import {useAppSelector} from "@/hooks/useAppSelector";

const StudentStatisticsComponent = () => {
    const studentStatistics = useAppSelector(state => state.studentStore.studentStatistics);

    if (!studentStatistics) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full flex flex-col items-center justify-center py-4">
            <h1 className="text-xl font-semibold mb-2 text-center">Orders statistics:</h1>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-800">
                <span><strong>Total:{studentStatistics.total}</strong></span>
                <span><strong>Agree: {studentStatistics['Aggre']}</strong></span>
                <span><strong>In work: {studentStatistics['In work']}</strong></span>
                <span><strong>Disagree:{studentStatistics['Disaggre']}</strong></span>
                <span><strong>Dubbing: {studentStatistics['Dubbing']}</strong></span>
                <span><strong>New: {studentStatistics['New']}</strong></span>
            </div>
        </div>
    );
};

export default StudentStatisticsComponent;