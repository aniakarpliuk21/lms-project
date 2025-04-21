'use client';

import React, { FC } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
type PaginationProps = {
    totalManager: number;
    limit: number;
};

const PaginationComponent: FC<PaginationProps> = ({ totalManager,limit }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const totalPages = totalManager/limit
    const currentPage = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;

    const updatePage = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());
        router.push(`?${params.toString()}`);
    };

    const onClickPrevHandler = () => {
        if (currentPage > 1) {
            updatePage(currentPage - 1);
        }
    };
    const onClickNextHandler = () => {
        if (currentPage < totalPages) {
            updatePage(currentPage + 1);
        }
    };

    return (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 flex gap-1 p-3 bg-green-50 rounded-full shadow-lg z-100">
        <button
            className="bg-lime-600 text-white border-none rounded-full py-2 px-3"
            onClick={onClickPrevHandler} disabled={currentPage <= 1}>Prev</button>
    <button
        className="bg-lime-600 text-white border-none rounded-full py-2 px-3"
        onClick={onClickNextHandler} disabled={currentPage >= totalPages || currentPage >= 500}>Next</button>
    </div>
);
};

export default PaginationComponent;