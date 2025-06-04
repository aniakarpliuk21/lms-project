"use client";
import React from 'react';
import {useAppSelector} from "@/hooks/useAppSelector";

const StudentStatisticsComponent = () => {
    const studentStatistics = useAppSelector(state => state.studentStore.studentStatistics);
    if (!studentStatistics) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <h1 className="text-xl font-semibold">Orders statistic:</h1>
            <ul className="text-sm text-gray-700 leading-6">
                <li><span>Total:{studentStatistics.total}</span></li>
                <li><span>Agree:{studentStatistics['Agree']}</span></li>
                <li><span>In work:{studentStatistics['In work']}</span></li>
                <li><span>Disagree:{studentStatistics['Disagree']}</span></li>
                <li><span>Dubbing:{studentStatistics['Dubbing']}</span></li>
                <li><span>New:{studentStatistics['New']}</span></li>
            </ul>
        </div>
);
};

export default StudentStatisticsComponent;