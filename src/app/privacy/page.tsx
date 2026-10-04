import React from "react";
import { Metadata } from "next";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy & Data Protection Policy",
  description:
    "Startup Jigawa Ltd data protection principles, NDPR compliance, and privacy safeguards for participants and partners.",
};

export default function PrivacyPage() {
  return (
    <PublicLayout>
      <PageHeader
        badge="Legal &amp; Compliance"
        title="Privacy &amp; Data Protection Policy"
        description="Our commitment to safeguarding personal, institutional, and research data in full compliance with the Nigeria Data Protection Act (NDPA)."
        breadcrumbs={[{ label: "Privacy Policy" }]}
      />

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-sm sm:text-base text-slate-700 leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              1. Institutional Commitment
            </h2>
            <p>
              Startup Jigawa Ltd (RC 7256149) is committed to protecting the privacy, integrity, and security of all personal data provided by participants, learners, partner institutions, researchers, and website visitors. We collect only what is strictly necessary to deliver authorized training, civic technology programs, or research projects.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              2. Data Collected &amp; Purpose of Processing
            </h2>
            <p>We process personal data solely for legitimate institutional purposes, including:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-600">
              <li>Admissions and cohort management for Digital Skills Academy programs.</li>
              <li>Verification of participant attendance and issuance of accredited certifications.</li>
              <li>Anonymized baseline research and civic data analysis (with explicit participant consent).</li>
              <li>Direct response to institutional partnership and technical consulting enquiries.</li>
              <li>Delivery of requested newsletters, publications, and open call alerts.</li>
            </ul>
          </div>

          <div id="data-protection">
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              3. Data Protection Principles &amp; NDPA Compliance
            </h2>
            <p>
              In accordance with Nigeria Data Protection Commission (NDPC) guidelines and the NDPA 2023:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-600">
              <li><strong>No Data Monetization:</strong> Startup Jigawa never sells, leases, or trades personal information to advertisers or commercial third parties.</li>
              <li><strong>Storage &amp; Encryption:</strong> All sensitive records are stored in encrypted cloud environments with role-based access control (RBAC).</li>
              <li><strong>Retention Limits:</strong> Application records are retained only for the duration required by program reporting and M&amp;E audit requirements.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              4. Contact the Data Protection Officer
            </h2>
            <p>
              To exercise your rights to access, rectify, or request erasure of your personal data, contact:
            </p>
            <div className="mt-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm">
              <div className="font-semibold text-slate-800">
                Data Protection Officer, Startup Jigawa Ltd
              </div>
              <div className="text-slate-600">97 Nasiriyya House, Along Nuhu Muhammad Sunusi Road, Dutse, Jigawa State</div>
              <div className="text-slate-600">Email: <a href={`mailto:${siteConfig.contact.email}`} className="text-[#265728] underline">{siteConfig.contact.email}</a></div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
