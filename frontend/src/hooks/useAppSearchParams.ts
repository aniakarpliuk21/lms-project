"use client";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

export const useAppSearchParams = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const getParam = (key: string) => {
        return searchParams?.get(key) ?? null;
    };

    const getPageParam = () => {
        return searchParams?.get("page") || "1";
    };
    const setParam = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams?.toString());
        params.set(key, value);
        router.push(`${pathname}?${params.toString()}`);
    };


    return { getParam, getPageParam, setParam};
};