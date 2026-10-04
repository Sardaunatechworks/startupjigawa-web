import React from "react";
import Link from "next/link";
import { Opportunity } from "@/types";
import { Badge } from "./Badge";
import { formatDate } from "@/lib/utils";

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const isOpen = opportunity.status === "OPEN";

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 sm:p-6 rounded-xl border border-slate-200 bg-white hover:border-[#265728]/40 hover:shadow-card-hover transition-all duration-200 gap-4">
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge variant={isOpen ? "success" : "neutral"}>
            {opportunity.status}
          </Badge>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
            {opportunity.type}
          </span>
          {opportunity.location && (
            <span className="text-xs text-slate-500">
              • {opportunity.location}
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-slate-900 hover:text-[#265728] transition-colors">
          <Link href={`/opportunities/${opportunity.slug}`}>
            {opportunity.title}
          </Link>
        </h3>

        <p className="mt-1 text-sm text-slate-600 line-clamp-2">
          {opportunity.summary}
        </p>

        <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
          <div>
            <span className="font-medium text-slate-700">Deadline:</span>{" "}
            <span className={isOpen ? "text-amber-700 font-semibold" : ""}>
              {formatDate(opportunity.deadline)}
            </span>
          </div>
          {opportunity.eligibility && (
            <div className="hidden md:block truncate max-w-xs text-slate-400">
              Eligible: {opportunity.eligibility}
            </div>
          )}
        </div>
      </div>

      <div className="w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
        {opportunity.applicationUrl ? (
          <a
            href={opportunity.applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-center px-4 py-2 text-xs font-bold text-white bg-[#265728] hover:bg-[#1b411d] rounded-lg shadow-sm transition-colors"
          >
            Apply Now &rarr;
          </a>
        ) : (
          <Link
            href={`/opportunities/${opportunity.slug}`}
            className="w-full sm:w-auto text-center px-4 py-2 text-xs font-bold text-[#265728] bg-[#eaf4eb] hover:bg-[#d6ebd8] rounded-lg transition-colors"
          >
            View Details
          </Link>
        )}
      </div>
    </div>
  );
}
