import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "warning" | "info" | "neutral" | "brand";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "neutral",
  size = "sm",
  className,
}: BadgeProps) {
  const variants = {
    brand: "bg-[#eaf4eb] text-[#265728] border border-[#265728]/20",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    warning: "bg-amber-50 text-amber-800 border border-amber-200",
    info: "bg-sky-50 text-sky-700 border border-sky-200",
    neutral: "bg-slate-100 text-slate-700 border border-slate-200",
  };

  const sizes = {
    sm: "text-xs px-2.5 py-0.5 font-medium rounded-full",
    md: "text-sm px-3 py-1 font-medium rounded-full",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center tracking-wide",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
