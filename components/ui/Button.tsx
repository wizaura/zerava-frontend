import { cn } from "@/app/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary";
};

export function Button({
    variant = "primary",
    className,
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(
                "inline-flex items-center justify-center px-6 py-3 text-sm font-semibold transition-all duration-200",
                variant === "primary" &&
                "bg-electric-teal text-eco-black rounded-md hover:brightness-110",
                variant === "secondary" &&
                "border border-electric-teal text-electric-teal rounded-md hover:bg-electric-teal hover:text-eco-black",
                className
            )}
            {...props}
        />
    );
}
