import React from "react";
import { Metadata } from "next";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { ImpactBanner } from "@/components/home/ImpactBanner";
import { ImpactStoriesSection } from "@/components/home/ImpactStoriesSection";
import { getVerifiedImpactMetrics, getFeaturedImpactStories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Impact & Evidence | Monitoring & Evaluation",
  description:
    "Explore Startup Jigawa's verified track record, monitoring and evaluation framework, and empirical outcomes across 9 years.",
};

export default async function ImpactPage() {
  const [metrics, stories] = await Promise.all([
    getVerifiedImpactMetrics(),
    getFeaturedImpactStories(),
  ]);

  return (
    <PublicLayout>
      <PageHeader
        badge="Impact"
        title="Our Impact"
        description="We track our work carefully. Here is how we measure results and ensure our training numbers, projects, and community outcomes are accurate."
        breadcrumbs={[{ label: "Impact" }]}
      />

      {/* Verified Stats */}
      <ImpactBanner metrics={metrics} />

      {/* Monitoring & Evaluation Framework */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#265728] bg-[#eaf4eb] px-3 py-1 rounded-full">
              How We Measure
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-slate-900">
              Our Verification Process
            </h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              We verify our participant numbers, course completions, and post-training outcomes through four clear stages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-subtle">
              <span className="font-mono text-xs font-bold text-[#265728]">
                STAGE 1
              </span>
              <h3 className="mt-2 text-base font-bold text-slate-900">
                Participant Records
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                We record participant details, attendance, and training center locations during every training cohort.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-subtle">
              <span className="font-mono text-xs font-bold text-[#265728]">
                STAGE 2
              </span>
              <h3 className="mt-2 text-base font-bold text-slate-900">
                Project Evaluation
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Certificates are awarded only when participants successfully complete and present their practical final projects.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-subtle">
              <span className="font-mono text-xs font-bold text-[#265728]">
                STAGE 3
              </span>
              <h3 className="mt-2 text-base font-bold text-slate-900">
                Graduate Follow-ups
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                We contact our graduates at 3, 6, and 12-month intervals to check on their employment, freelance work, or business progress.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-subtle">
              <span className="font-mono text-xs font-bold text-[#265728]">
                STAGE 4
              </span>
              <h3 className="mt-2 text-base font-bold text-slate-900">
                Partner Reviews
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                We review and reconcile our programme data with our government and development partners, including NITDA and 3MTT.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies & Impact Stories */}
      <div id="stories">
        <ImpactStoriesSection stories={stories} />
      </div>
    </PublicLayout>
  );
}
