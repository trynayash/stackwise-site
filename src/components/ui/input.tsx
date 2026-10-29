"use client";

import React from "react";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

const fieldBase =
    "w-full rounded-xl border bg-surface px-4 text-[15px] text-white placeholder:text-white/30 transition-colors duration-200 focus:outline-none focus:border-white/50 disabled:cursor-not-allowed disabled:opacity-50";

function borderFor(invalid?: boolean) {
    return invalid ? "border-red-400/70" : "border-line-strong hover:border-white/25";
}

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean };

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, invalid, ...props }, ref) => (
    <input ref={ref} aria-invalid={invalid || undefined} className={cn(fieldBase, borderFor(invalid), "h-12", className)} {...props} />
));
Input.displayName = "Input";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean };

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, invalid, ...props }, ref) => (
    <textarea ref={ref} aria-invalid={invalid || undefined} className={cn(fieldBase, borderFor(invalid), "min-h-[140px] resize-y py-3.5 leading-relaxed", className)} {...props} />
));
Textarea.displayName = "Textarea";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean; placeholder?: string };

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ className, invalid, placeholder, children, value, ...props }, ref) => (
    <div className="relative">
        <select
            ref={ref}
            value={value}
            aria-invalid={invalid || undefined}
            className={cn(fieldBase, borderFor(invalid), "h-12 cursor-pointer appearance-none pr-10", !value && "text-white/50", className)}
            {...props}
        >
            {placeholder && (
                <option value="" disabled>
                    {placeholder}
                </option>
            )}
            {children}
        </select>
        <Icon icon={ArrowDown01Icon} size={18} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-white/55" />
    </div>
));
Select.displayName = "Select";

/** Label + control + error message. */
export function Field({
    id,
    label,
    optional,
    error,
    children,
    className,
}: {
    id: string;
    label: string;
    optional?: boolean;
    error?: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={cn("space-y-2", className)}>
            <label htmlFor={id} className="block text-sm font-medium text-white/75">
                {label}
                {optional && <span className="ml-1 font-normal text-white/50">(optional)</span>}
            </label>
            {children}
            {error && (
                <p id={`${id}-error`} className="text-sm text-red-400">
                    {error}
                </p>
            )}
        </div>
    );
}
