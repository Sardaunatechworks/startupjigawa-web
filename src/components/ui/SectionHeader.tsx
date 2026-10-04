import React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-10 sm:mb-12",
        align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-3xl",
        className
      )}
    >
      {badge && (
        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#265728] bg-[#eaf4eb] px-3 py-1 rounded-full mb-3">
          {badge}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
