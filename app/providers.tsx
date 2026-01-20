"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { useAuthBootstrap } from "./lib/useAuthBootstrap";

function AuthBootstrapper({ children }: { children: React.ReactNode }) {
    useAuthBootstrap();
    return <>{children}</>;
}

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <AuthBootstrapper>
                {children}
            </AuthBootstrapper>
        </Provider>
    );
}
