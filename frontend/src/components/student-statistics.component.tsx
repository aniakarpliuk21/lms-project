import React from 'react';

const StudentStatisticsComponent = () => {
    return (
        <div>
            <h1 className="text-xl font-semibold">Orders statistic</h1>
            <ul className="text-sm text-gray-700 leading-6">
                <li><span>Total:</span></li>
                <li><span>Agree:</span></li>
                <li><span>In work:</span></li>
                <li><span>Disagree:</span></li>
                <li><span>Dubbing:</span></li>
                <li><span>New:</span></li>
            </ul>
        </div>
);
};

export default StudentStatisticsComponent;