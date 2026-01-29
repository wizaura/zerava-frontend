import { ChevronRightIcon } from "@heroicons/react/20/solid";

type BookingStepsProps = {
    currentStep: number;
};

const steps = ["Service", "Schedule", "Address", "Details", "Payment"];

export default function BookingSteps({ currentStep }: BookingStepsProps) {
    return (
        <div className="w-full border-b bg-white">
            <div className="mx-auto max-w-6xl px-4 py-6">
                <div className="flex items-center justify-center gap-12">
                    {steps.map((label, index) => {
                        const isActive = index === currentStep;
                        const isCompleted = index < currentStep;

                        return (
                            <div key={label} className="flex items-center gap-4">
                                {/* Circle */}
                                <div
                                    className={[
                                        "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition",
                                        isCompleted
                                            ? "bg-electric-teal text-white"
                                            : isActive
                                                ? "bg-black text-white"
                                                : "bg-gray-100 text-gray-400",
                                    ].join(" ")}
                                >
                                    {isCompleted ? "✓" : index + 1}
                                </div>

                                {/* Label */}
                                <span
                                    className={[
                                        "text-sm font-medium transition",
                                        isActive
                                            ? "text-black"
                                            : isCompleted
                                                ? "text-electric-teal"
                                                : "text-gray-400",
                                    ].join(" ")}
                                >
                                    {label}
                                </span>

                                {/* Arrow */}
                                {index < steps.length - 1 && (
                                    <ChevronRightIcon className="h-5 w-5 text-gray-300" />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
