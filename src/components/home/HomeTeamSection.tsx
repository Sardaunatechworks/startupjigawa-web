import React from "react";
import Link from "next/link";
import { TeamMember } from "@/types";
import { TeamMemberCard } from "@/components/ui/TeamMemberCard";

interface HomeTeamSectionProps {
  team?: TeamMember[];
}

export function HomeTeamSection({ team = [] }: HomeTeamSectionProps) {
  if (!team || team.length === 0) return null;

  return (
    <section id="team" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200 gap-4">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#265728] bg-[#eaf4eb] px-3 py-1 rounded-full">
              Leadership &amp; Advisors
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900">
              Meet Our Team
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Our leadership and advisory team bring years of experience in vocational training, software engineering, community programmes, and public policy in Jigawa.
            </p>
          </div>
          <Link
            href="/about#team"
            className="text-xs sm:text-sm font-bold text-[#265728] hover:underline whitespace-nowrap"
          >
            All Team &amp; Governance &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8">
          {team.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
