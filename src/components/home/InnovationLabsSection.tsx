import React from "react";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";

const labs = [
  {
    name: "Civic Technology & Open Governance Lab",
    slug: "civic-tech",
    tagline: "Citizen Feedback & Transparency",
    description:
      "Develops digital tools that make public information easy to access, collect citizen feedback, and support open government initiatives across Jigawa.",
    focusAreas: [
      "Open Government (OGP) Support",
      "Citizen Feedback & Community Priorities",
      "Civic Innovation Fellowships",
      "Community Issue Mapping",
    ],
  },
  {
    name: "Research, Policy & Data Lab",
    slug: "research-lab",
    tagline: "Field Data & Community Research",
    description:
      "Conducts baseline surveys, field studies, and project evaluations across all 27 Local Government Areas to support informed public decisions.",
    focusAreas: [
      "Field Surveys in All 27 LGAs",
      "Policy Briefs & Community Reports",
      "Local Data Portals",
      "Project & Programme Evaluation",
    ],
  },
  {
    name: "Digital Talent & Academy Lab",
    slug: "talent-lab",
    tagline: "Skills Training & Career Pathways",
    description:
      "Houses our Digital Skills Academy and national training cohorts (including 3MTT and NJFP), helping participants build practical technical skills.",
    focusAreas: [
      "Software Development Training",
      "Data Analytics & Digital Skills",
      "3MTT & National Skills Delivery",
      "Internships & Graduate Support",
    ],
  },
  {
    name: "Product Innovation & Climate Lab",
    slug: "product-lab",
    tagline: "Tools for Local Businesses & Communities",
    description:
      "Builds and tests digital solutions for local challenges, including flood alerts for riverine areas and sales tools for small traders.",
    focusAreas: [
      "Tools for Small Businesses & Traders",
      "Flood-Risk Mapping for Riverine LGAs",
      "Hausa Weather & Crop Alerts",
      "Community Testing & Prototypes",
    ],
  },
];

export function InnovationLabsSection() {
  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Innovation Labs"
          title="Our Four Innovation Labs"
          subtitle="Our labs develop practical technology, train local talent, conduct field studies, and support citizen engagement."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {labs.map((lab) => (
            <div
              key={lab.slug}
              className="p-8 rounded-2xl bg-white border border-slate-200 shadow-subtle hover:border-[#265728]/40 hover:shadow-card-hover transition-all flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#265728] mb-1">
                  Innovation Lab
                </div>
                <h3 className="text-xl font-bold text-slate-900 leading-snug">
                  {lab.name}
                </h3>
                <p className="mt-1 text-xs font-medium text-[#c28829]">
                  {lab.tagline}
                </p>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {lab.description}
                </p>

                <div className="mt-6">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Key Capabilities &amp; Focus
                  </div>
                  <ul className="space-y-1.5">
                    {lab.focusAreas.map((area) => (
                      <li
                        key={area}
                        className="text-xs text-slate-700 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#265728]" />
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/innovation#${lab.slug}`}
                  className="text-xs font-bold text-[#265728] hover:underline flex items-center gap-1"
                >
                  <span>Explore Lab Work &amp; Outputs</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
