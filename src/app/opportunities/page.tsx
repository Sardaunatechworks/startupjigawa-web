import React from "react";
import { Metadata } from "next";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { OpportunityCard } from "@/components/ui/OpportunityCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { getOpenOpportunities } from "@/lib/data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Opportunities & Open Calls",
  description:
    "Apply for active bootcamps, fellowships, internships, and innovation challenges at Startup Jigawa.",
};

export default async function OpportunitiesPage() {
  const opportunities = await getOpenOpportunities();

  const types = [
    "All Opportunities",
    "Fellowships",
    "Bootcamps",
    "Internships",
    "Calls for Proposals",
    "Competitions",
  ];

  return (
    <PublicLayout>
      <PageHeader
        badge="Opportunities"
        title="Current Opportunities"
        description="Find open bootcamps, fellowships, internships, and application calls across Jigawa State."
        breadcrumbs={[{ label: "Opportunities" }]}
      />

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Opportunity type filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-slate-200">
            {types.map((type, idx) => (
              <button
                key={type}
                className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  idx === 0
                    ? "bg-[#265728] text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {opportunities.length > 0 ? (
            <div className="space-y-4">
              {opportunities.map((opp) => (
                <OpportunityCard key={opp.id} opportunity={opp} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Open Applications Right Now"
              description="There are no open calls accepting applications at this time. Please check back soon or join our email list to receive updates."
              actionLabel="View Our Programmes"
              actionHref="/programs"
            />
          )}

          {/* Equal Opportunity & Transparency Statement */}
          <div className="mt-16 p-6 rounded-2xl bg-[#f3f9f4] border border-[#265728]/20 text-xs sm:text-sm text-slate-700">
            <h4 className="font-bold text-[#265728] mb-1">
              Fair and Open Selection
            </h4>
            <p className="leading-relaxed">
              All applications to Startup Jigawa programmes are reviewed fairly based on merit. We do not charge application fees, and selection does not depend on political connections or personal recommendations.
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
