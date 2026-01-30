import { Clock10Icon } from "lucide-react";

export default function EcoCertificate() {
    return (
        <div className="mx-auto flex flex-col gap-2 items-center justify-center p-24">
            <Clock10Icon className="text-green-600"/>
            <p className="text-green-600 font-semibold">Coming Soon</p>
        </div>
    )
}