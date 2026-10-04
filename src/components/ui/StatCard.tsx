import React from "react";
import { cn } from "@/lib/utils";

export interface StatCardProps {
  value: string;
  label: string;
  description?: string;
  sourceReference?: string;
  isVerified?: boolean;
  className?: string;
}

export function StatCard({
  value,
  label,
  description,
  sourceReference,
  isVerified,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "relative p-6 sm:p-7 rounded-xl bg-white border border-slate-200/80 shadow-sm transition-all duration-200 hover:border-[#265728]/30 hover:shadow-md",
        className
      )}
    >
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-3xl sm:text-4xl md:text-5xl font-black text-[#265728] tracking-tight">
          {value}
        </span>
        {isVerified && (
          <span
            title="Verified by Startup Jigawa M&E Framework"
            className="inline-flex items-center text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200"
          >
            ✓ Verified
          </span>
        )}
      </div>
      <h3 className="mt-2 text-base font-semibold text-slate-800">{label}</h3>
      {description && (
        <p className="mt-1 text-xs sm:text-sm text-slate-500 leading-normal">
          {description}
        </p>
      )}
      {sourceReference && (
        <p className="mt-3 text-[11px] text-slate-400 border-t border-slate-100 pt-2 italic">
          Ref: {sourceReference}
        </p>
      )}
    </div>
  );
}
