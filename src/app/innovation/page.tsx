import React from "react";
import { Metadata } from "next";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { InnovationLabsSection } from "@/components/home/InnovationLabsSection";
import { FeaturedProductsSection } from "@/components/home/FeaturedProductsSection";
import { CommunityToPolicy } from "@/components/home/CommunityToPolicy";
import { getProducts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Innovation & Labs | Civic Tech, Research & Products",
  description:
    "Explore Startup Jigawa's four innovation labs, technology products, and 10-step Community-to-Policy delivery pathway.",
};

export default async function InnovationPage() {
  const products = await getProducts();

  return (
    <PublicLayout>
      <PageHeader
        badge="Innovation &amp; Labs"
        title="Practical Technology for Jigawa"
        description="Our innovation labs build digital tools, conduct research, and test solutions for everyday challenges in our communities."
        breadcrumbs={[{ label: "Innovation" }]}
      />

      {/* 4 Innovation Labs */}
      <InnovationLabsSection />

      {/* Technology Products & Solutions */}
      <div id="products">
        <FeaturedProductsSection products={products} />
      </div>

      {/* 10-Step Community-to-Policy Delivery Pathway */}
      <div id="pathway">
        <CommunityToPolicy />
      </div>

      {/* Climate Resilience & Idea Lab Spotlight */}
      <section id="climate-lab" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#f3f9f4] border border-[#265728]/20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#265728] bg-white px-3 py-1 rounded-full border border-[#265728]/20">
                Special Initiative
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Climate Resilience &amp; Flood Alerts
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Communities along the Hadejia-Jama&apos;are river basin face seasonal flood risks and changing weather patterns. Our Climate Lab develops localized SMS weather alerts in Hausa, maps community flood risks, and supports young innovators working on environmental tools.
              </p>
              <div className="pt-2 flex flex-wrap gap-3 text-xs text-[#265728] font-semibold">
                <span className="bg-white px-3 py-1.5 rounded-lg border border-[#265728]/20">
                  Flood Risk Mapping
                </span>
                <span className="bg-white px-3 py-1.5 rounded-lg border border-[#265728]/20">
                  Agro-Weather SMS/USSD
                </span>
                <span className="bg-white px-3 py-1.5 rounded-lg border border-[#265728]/20">
                  Youth Climate Challenges
                </span>
              </div>
            </div>
            <div className="lg:col-span-4 text-left lg:text-right">
              <a
                href="/contact?type=PARTNERSHIP"
                className="inline-block px-6 py-3.5 rounded-xl bg-[#265728] hover:bg-[#1b411d] text-white text-xs sm:text-sm font-bold shadow-md transition-colors"
              >
                Partner on Climate Projects &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
