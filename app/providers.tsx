"use client";
import { Provider } from "react-redux";
import { store } from "./store";
import { useAuthBootstrap } from "./lib/useAuthBootstrap";

export default function Providers({ children }) {

    return <Provider store={store}>{children}</Provider>;
}
