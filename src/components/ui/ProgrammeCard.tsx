import React from "react";
import Link from "next/link";
import { Program } from "@/types";
import { Badge } from "./Badge";
import { formatDate } from "@/lib/utils";

interface ProgrammeCardProps {
  program: Program;
}

export function ProgrammeCard({ program }: ProgrammeCardProps) {
  const statusVariants: Record<string, "success" | "warning" | "info" | "neutral" | "brand"> = {
    OPEN: "success",
    UPCOMING: "warning",
    ONGOING: "brand",
    CLOSED: "neutral",
    COMPLETED: "neutral",
    ARCHIVED: "neutral",
    DRAFT: "neutral",
  };

  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white overflow-hidden shadow-subtle hover:shadow-card-hover hover:border-[#265728]/30 transition-all duration-200">
      {/* Visual Header / Cover */}
      <div className="h-44 w-full bg-gradient-to-br from-[#1b411d] to-[#265728] relative flex items-center justify-center p-6 text-white overflow-hidden">
        {program.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={program.coverImage}
            alt={program.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="text-center relative z-10">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
              {program.category || "Flagship Program"}
            </span>
            <div className="text-xl font-bold mt-1 text-white line-clamp-2">
              {program.title}
            </div>
          </div>
        )}
        <div className="absolute top-3 right-3 z-20">
          <Badge variant={statusVariants[program.status] || "neutral"}>
            {program.status}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <span>{program.deliveryMode || "Physical & Hybrid"}</span>
            {program.location && (
              <>
                <span>•</span>
                <span>{program.location}</span>
              </>
            )}
          </div>

          <h3 className="text-lg font-bold text-slate-900 line-clamp-2 hover:text-[#265728] transition-colors">
            <Link href={`/programs/${program.slug}`}>{program.title}</Link>
          </h3>

          <p className="mt-2 text-sm text-slate-600 line-clamp-3 leading-relaxed">
            {program.summary}
          </p>
        </div>

        {/* Footer info & CTA */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
          <div>
            {program.deadline ? (
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  Deadline
                </span>
                <span className="font-semibold text-slate-700">
                  {formatDate(program.deadline)}
                </span>
              </div>
            ) : (
              <span className="text-slate-400 italic">Rolling enrolment</span>
            )}
          </div>
          <Link
            href={`/programs/${program.slug}`}
            className="font-semibold text-[#265728] hover:text-[#1b411d] flex items-center gap-1 group"
          >
            <span>Learn More</span>
            <span className="group-hover:translate-x-0.5 transition-transform">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
