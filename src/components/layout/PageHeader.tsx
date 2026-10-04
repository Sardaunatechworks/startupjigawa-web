import React from "react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export interface PageHeaderProps {
  badge?: string;
  title: string;
  description: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

export function PageHeader({
  badge,
  title,
  description,
  breadcrumbs = [],
}: PageHeaderProps) {
  return (
    <div className="bg-gradient-to-b from-[#f3f8f4] to-white border-b border-slate-200 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {breadcrumbs.length > 0 && (
          <div className="mb-4">
            <Breadcrumb items={breadcrumbs} />
          </div>
        )}
        {badge && (
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#265728] bg-[#eaf4eb] px-3 py-1 rounded-full mb-3">
            {badge}
          </span>
        )}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-4xl">
          {title}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
