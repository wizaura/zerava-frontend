import LoginPage from "@/components/user/login/Main";
import { Suspense } from "react";

export default function Login() {
    return (
        <Suspense fallback={null}>
            <LoginPage />
        </Suspense>
    )
}