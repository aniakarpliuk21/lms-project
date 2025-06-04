"use client";
import React, {FC} from 'react';
import Image from "next/image";

type StudentPaginationProps = {
    totalStudents: number;
    limit: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}
const StudentPaginationComponent:FC<StudentPaginationProps> = ({totalStudents,limit,currentPage,onPageChange}) => {
    const totalPages = Math.ceil(totalStudents / limit);

    const updatePage = (newPage: number) => {
        onPageChange(newPage);
    };

    const onClickPrevHandler = () => {
        if (currentPage > 1) updatePage(currentPage - 1);
    };

    const onClickNextHandler = () => {
        if (currentPage < totalPages) updatePage(currentPage + 1);
    };

    const generatePageNumbers = (): (number | "...")[] => {
        const pages: (number | "...")[] = [];

        if (totalPages <= 9) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 5) {
                for (let i = 1; i <= 7; i++) pages.push(i);
                pages.push("...", totalPages);
            }
            else if (currentPage >= totalPages - 4) {
                pages.push(1, "...");
                for (let i = totalPages - 6; i <= totalPages; i++) pages.push(i);
            }
            else {
                pages.push(1, "...");

                for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                    pages.push(i);
                }
                pages.push("...", totalPages);
            }
        }
        return pages;
    };




    const pages = generatePageNumbers();


    return (
        <div className="flex justify-center items-center gap-2 flex-wrap">
            {currentPage > 1 && (
            <button
                className="bg-lime-600 text-white border-none rounded-full py-1 px-2 disabled:opacity-40"
                onClick={onClickPrevHandler}
                disabled={currentPage <= 1}
            >
                <Image src="/images/prev.png" alt="prev" width={25} height={25} className="w-6 h-6" />
            </button>
            )}
            {pages.map((page, index) =>
                page === "..." ? (
                    <span key={`ellipsis-${index}`} className="px-2 text-gray-500">...</span>
                ) : (
                    <button
                        key={`page-${page}`}
                        className={`rounded-full w-8 h-8 flex items-center justify-center text-sm ${
                            page === currentPage ? 'bg-lime-700 text-white' : 'bg-lime-600 text-white'
                        }`}
                        onClick={() => updatePage(Number(page))}
                    >
                        {page}
                    </button>
                )
            )}

{currentPage < totalPages && (
    <button
        className="bg-lime-600 text-white border-none rounded-full py-1 px-2"
        onClick={onClickNextHandler}
    >
        <Image src="/images/next.png" alt="next" width={25} height={25} className="w-6 h-6" />
    </button>
)}
        </div>
    );
};

export default StudentPaginationComponent;