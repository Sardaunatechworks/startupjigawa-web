import React from "react";
import { Metadata } from "next";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Use | Legal Terms & Conditions",
  description:
    "Terms governing the use of Startup Jigawa Ltd's website, platforms, research publications, and educational services.",
};

export default function TermsPage() {
  return (
    <PublicLayout>
      <PageHeader
        badge="Legal &amp; Compliance"
        title="Terms of Institutional Use"
        description="Terms governing interactions with Startup Jigawa Ltd, access to knowledge products, and use of digital tools."
        breadcrumbs={[{ label: "Terms of Use" }]}
      />

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-sm sm:text-base text-slate-700 leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using this website, knowledge repositories, or digital platforms operated by Startup Jigawa Ltd (RC 7256149), you agree to comply with and be bound by these Terms of Use.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              2. Intellectual Property &amp; Open Access
            </h2>
            <p>
              Unless otherwise noted, all curriculum materials, software code, research publications, and brand assets are the intellectual property of Startup Jigawa Ltd. Publications marked as Open Access or Creative Commons may be shared and cited with appropriate institutional attribution: <em>Startup Jigawa Ltd, Dutse, Nigeria</em>.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              3. Verification of Results &amp; Disclaimer
            </h2>
            <p>
              All impact metrics and participant counts published on this website reflect verified records maintained by our M&amp;E unit. While we exercise rigorous due diligence to ensure accuracy, forward-looking statements or pilot concepts are explicitly designated as such and do not constitute commercial guarantees.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              4. Governing Law &amp; Jurisdiction
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the competent courts in Jigawa State, Nigeria.
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
