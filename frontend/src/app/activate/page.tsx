import {Suspense} from "react";
import ActivatePage from "@/pages/activatePage";


export default function ActivatePageWrapper() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ActivatePage />
        </Suspense>
    );
}