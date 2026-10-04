import React from "react";
import { Metadata } from "next";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProgrammeCard } from "@/components/ui/ProgrammeCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { getAllPrograms } from "@/lib/data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Programs & Capacity Building",
  description:
    "Explore Startup Jigawa's digital skills diploma pathways, national talent programs, and civic innovation fellowships.",
};

export default async function ProgramsPage() {
  const programs = await getAllPrograms();

  const categories = [
    "All Programs",
    "Digital Skills Academy",
    "Civic Technology & Democracy",
    "Entrepreneurship & MSME",
    "National Initiatives (3MTT/NJFP)",
    "Women in Tech & Rural Inclusion",
  ];

  return (
    <PublicLayout>
      <PageHeader
        badge="Programmes"
        title="Our Programmes"
        description="We run practical training courses, fellowships, and national talent initiatives designed to help people in Jigawa build skills and find opportunities."
        breadcrumbs={[{ label: "Programmes" }]}
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

          {programs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((program) => (
                <ProgrammeCard key={program.id} program={program} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Active Programmes Right Now"
              description="New training cohorts and admission dates will be announced here as soon as applications open."
              actionLabel="View Current Opportunities"
              actionHref="/opportunities"
            />
          )}

          {/* Institutional note on training verification */}
          <div className="mt-16 p-6 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-600">
            <span className="font-bold text-slate-800">
              Certificate Verification:
            </span>{" "}
            Startup Jigawa issues verified certificates for all completed training programmes. Employers and partner organisations can verify a certificate by emailing{" "}
            <a
              href="mailto:verification@startupjigawa.com"
              className="text-[#265728] font-semibold underline"
            >
              verification@startupjigawa.com
            </a>
            .
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
