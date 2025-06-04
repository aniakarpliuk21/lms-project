// "use client";
// import { useRouter, useSearchParams } from "next/navigation";
//
// export const useUpdateSearchParams = () => {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//
//     const updateParams = (params: Record<string, string | number | undefined>) => {
//         const newParams = new URLSearchParams(searchParams.toString());
//
//         Object.entries(params).forEach(([key, value]) => {
//             if (value === undefined || value === "") {
//                 newParams.delete(key);
//             } else {
//                 newParams.set(key, String(value));
//             }
//         });
//
//         router.push(`?${newParams.toString()}`);
//     };
//
//     return updateParams;
// };