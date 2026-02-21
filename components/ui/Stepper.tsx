import { ChevronRightIcon } from "@heroicons/react/20/solid";

type StepperProps = {
    steps: string[];
    currentStep: number;
};

export default function Stepper({
    steps,
    currentStep,
}: StepperProps) {
    return (
        <div className="w-full border-b bg-white">
            <div className="mx-auto max-w-6xl px-4 py-6">
                <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">

                    {steps.map((label, index) => {
                        const isActive = index === currentStep;
                        const isCompleted = index < currentStep;

                        return (
                            <div
                                key={label}
                                className="flex items-center gap-3"
                            >
                                {/* Circle */}
                                <div
                                    className={[
                                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium transition",
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
                                        "text-sm font-medium transition whitespace-nowrap",
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
                                    <ChevronRightIcon className="h-4 w-4 text-gray-300 shrink-0" />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
