import {Suspense} from "react";
import ManagerPage from "@/pages/managerPage";


export default function ManagerPageWrapper() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ManagerPage />
        </Suspense>
    );
}