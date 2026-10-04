import React from "react";
import { Metadata } from "next";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata: Metadata = {
  title: "Research, Policy & Knowledge Products",
  description:
    "Access publications, policy briefs, baseline studies, and civic data dashboards produced by Startup Jigawa's Research & Civic Data Lab.",
};

export default function ResearchPage() {
  const categories = [
    "All Publications",
    "Policy Briefs",
    "Baseline Surveys",
    "Civic Tech Case Studies",
    "Annual Impact Audits",
  ];

  return (
    <PublicLayout>
      <PageHeader
        badge="Research"
        title="Research &amp; Publications"
        description="Field studies, policy briefs, and community survey reports produced by Startup Jigawa across the 27 Local Government Areas of Jigawa State."
        breadcrumbs={[{ label: "Research" }]}
      />

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filter pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-slate-200">
            {categories.map((cat, idx) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  idx === 0
                    ? "bg-[#265728] text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Publications empty state placeholder */}
          <EmptyState
            title="No Publications Available Right Now"
            description="Our research team is compiling our latest policy briefs and community survey reports. They will be published here once ready for download."
            actionLabel="View Our Impact"
            actionHref="/impact"
          />

          {/* Research Commissioning Notice */}
          <div className="mt-16 p-8 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <h3 className="text-base font-bold text-slate-900">
                Commission a Field Study or Survey
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                We deploy trained field enumerators across all 27 Local Government Areas of Jigawa State to collect reliable local data for organisations and partners.
              </p>
            </div>
            <a
              href="/contact?type=PARTNERSHIP"
              className="px-5 py-2.5 rounded-lg bg-[#265728] hover:bg-[#1b411d] text-white text-xs font-bold whitespace-nowrap shadow-sm transition-colors"
            >
              Talk to Our Research Team &rarr;
            </a>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
