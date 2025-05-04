"use client";
import { useSearchParams } from "next/navigation";

export const useSearchParamsHandler = () => {
    const searchParams = useSearchParams();

    const getParam = (key: string) => {
        return searchParams?.get(key) ?? null;
    };

    const getPageParam = () => {
        return searchParams?.get("page") || "1";
    };

    return { getParam, getPageParam };
};