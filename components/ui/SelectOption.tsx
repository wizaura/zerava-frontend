"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

type Option = {
    label: string;
    value: string;
};

type Props = {
    value: string;
    onChange: (value: string) => void;
    options: Option[];
    placeholder?: string;
    className?: string;
};

export default function ZeravaSelect({
    value,
    onChange,
    options,
    placeholder = "Select option",
    className = "",
}: Props) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selected = options.find(o => o.value === value);

    /* ---------- CLOSE ON OUTSIDE CLICK ---------- */
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={`relative w-full sm:w-full ${className}`}
        >
            {/* Trigger */}
            <button
                type="button"
                onClick={() => setOpen(prev => !prev)}
                className={`
                    w-full flex justify-between items-center
                    bg-white border rounded-lg px-4 py-2.5 text-sm
                    text-eco-black
                    transition-all duration-200
                    ${open
                        ? "border-electric-teal ring-2 ring-electric-teal/20 shadow-md"
                        : "border-gray-200 hover:border-electric-teal hover:shadow-sm"
                    }
                `}
            >
                <span
                    className={`truncate ${
                        !selected ? "text-gray-400" : ""
                    }`}
                >
                    {selected?.label || placeholder}
                </span>

                <ChevronDown
                    size={18}
                    className={`transition-transform duration-200 ${
                        open ? "rotate-180 text-electric-teal" : "text-gray-500"
                    }`}
                />
            </button>

            {/* Dropdown */}
            {open && (
                <div
                    className="
                        absolute z-50 mt-2 w-full
                        bg-white border border-gray-200
                        rounded-2xl shadow-xl
                        overflow-hidden
                        animate-[fadeIn_0.15s_ease-out]
                    "
                >
                    {options.map(option => {
                        const isSelected = option.value === value;

                        return (
                            <div
                                key={option.value}
                                onClick={() => {
                                    onChange(option.value);
                                    setOpen(false);
                                }}
                                className={`
                                    px-4 py-3 text-sm cursor-pointer transition
                                    flex items-center justify-between
                                    ${
                                        isSelected
                                            ? "bg-electric-teal/10 text-electric-teal font-medium"
                                            : "text-eco-black hover:bg-gray-100"
                                    }
                                `}
                            >
                                {option.label}

                                {isSelected && (
                                    <span className="text-xs">
                                        ✓
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}