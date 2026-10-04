import React from "react";
import Link from "next/link";
import { Program } from "@/types";
import { ProgrammeCard } from "@/components/ui/ProgrammeCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EmptyState } from "@/components/ui/EmptyState";

interface FeaturedProgrammesProps {
  programs?: Program[];
}

export function FeaturedProgrammes({ programs = [] }: FeaturedProgrammesProps) {
  const hasPrograms = programs.length > 0;

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <SectionHeader
            badge="Programs &amp; Capacity"
            title="Flagship Capacity Building Initiatives"
            subtitle="Cohort-based technical training, digital academy diplomas, and civic technology fellowships."
            className="mb-0"
          />
          <Link
            href="/programs"
            className="text-xs sm:text-sm font-bold text-[#265728] hover:underline whitespace-nowrap"
          >
            View All Programs &rarr;
          </Link>
        </div>

        {hasPrograms ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((prog) => (
              <ProgrammeCard key={prog.id} program={prog} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Active Cohorts Currently Published"
            description="All upcoming training programs, fellowships, and diplomas will appear here as soon as official registration dates are announced."
            actionLabel="View Opportunities &amp; Calls"
            actionHref="/opportunities"
          />
        )}
      </div>
    </section>
  );
}
