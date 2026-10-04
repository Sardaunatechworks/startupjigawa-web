import React from "react";
import { Metadata } from "next";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { PartnersSection } from "@/components/home/PartnersSection";
import { getPublicPartners } from "@/lib/data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Partnerships & Institutional Collaborations",
  description:
    "Learn about Startup Jigawa's intergovernmental, multilateral, and civil-society partners, and our 5-stage engagement process.",
};

export default async function PartnersPage() {
  const partners = await getPublicPartners();

  const engagementProcess = [
    {
      step: "01",
      title: "Initial Discussion",
      description: "We meet to discuss shared goals, community needs, and what we want to achieve together.",
    },
    {
      step: "02",
      title: "Project Planning",
      description: "We define the project scope, target participants, timeline, and key milestones.",
    },
    {
      step: "03",
      title: "Partnership Agreement",
      description: "We sign an agreement outlining clear roles, responsibilities, standards, and reporting requirements.",
    },
    {
      step: "04",
      title: "Project Delivery",
      description: "We carry out the work with regular progress reports and active communication between teams.",
    },
    {
      step: "05",
      title: "Review & Reporting",
      description: "We evaluate project outcomes, publish joint findings, and plan for long-term sustainability.",
    },
  ];

  return (
    <PublicLayout>
      <PageHeader
        badge="Partners"
        title="Our Partners"
        description="We collaborate with government agencies, development partners, and civil society organisations to deliver practical programmes across Jigawa State."
        breadcrumbs={[{ label: "Partners" }]}
      />

      {/* Main Partners Display */}
      <PartnersSection partners={partners} />

      {/* 5-Stage Partnership Engagement Process */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#265728] bg-[#eaf4eb] px-3 py-1 rounded-full">
              How We Work Together
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-slate-900">
              Our 5-Stage Partnership Process
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              We follow a clear, professional process to make sure every collaboration achieves its goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {engagementProcess.map((item) => (
              <div
                key={item.step}
                className="p-6 rounded-xl bg-white border border-slate-200 shadow-subtle flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-sm font-black text-[#265728]">
                    {item.step}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 mt-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="/contact?type=PARTNERSHIP"
              className="inline-block px-8 py-3.5 rounded-xl bg-[#265728] hover:bg-[#1b411d] text-white font-bold text-sm shadow-md transition-colors"
            >
              Talk to Us About Partnering &rarr;
            </a>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
