import {Suspense} from "react";
import AdminPage from "@/pages/adminPage";

export default function AdminPanelPageWrapper() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AdminPage />
        </Suspense>
    );
}