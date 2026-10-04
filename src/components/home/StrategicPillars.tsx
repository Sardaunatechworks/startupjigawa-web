import React from "react";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";

const pillars = [
  {
    number: "01",
    title: "Digital Talent & Future Workforce",
    description:
      "Practical digital education, software development, data analysis, cybersecurity, digital literacy, and employability pathways.",
    delivery: "Classroom instruction, hands-on labs, mentorship, and portfolio capstones.",
    href: "/programs",
  },
  {
    number: "02",
    title: "Startup & Entrepreneurship",
    description:
      "Pre-incubation, incubation, acceleration, founder advisory, and market access for MSMEs across Northern Nigeria.",
    delivery: "Cohort acceleration, tailored mentorship, digital tools adoption, and investor linkages.",
    href: "/programs",
  },
  {
    number: "03",
    title: "Technology & Product Innovation",
    description:
      "Enterprise systems, mobile applications, data platforms, and AI solutions built to address documented regional challenges.",
    delivery: "In-house agile product teams following validation, build, test, and iterative deployment.",
    href: "/innovation#products",
  },
  {
    number: "04",
    title: "Civic Tech & Digital Democracy",
    description:
      "Digital platforms improving citizen information, participatory budgeting, public feedback, and engagement.",
    delivery: "Co-designed with citizen groups and public institutions; piloted at small scale.",
    href: "/innovation#civic-tech",
  },
  {
    number: "05",
    title: "Governance & Social Accountability",
    description:
      "Public service monitoring, open government tools, budget literacy, and support for the Open Government Partnership (OGP).",
    delivery: "Coordinated with MDAs and civil society using non-partisan, evidence-based methods.",
    href: "/innovation#governance",
  },
  {
    number: "06",
    title: "Research, Policy & Civic Data",
    description:
      "Surveys, baseline studies, civic data dashboards, policy briefs, and rigorous monitoring and evaluation services.",
    delivery: "Mixed-methods research with trained field enumerators and validated analytics.",
    href: "/research",
  },
  {
    number: "07",
    title: "Community Inclusion & Outreach",
    description:
      "LGA outreach, women and youth tech clubs, school coding hubs, and low-bandwidth local-language digital inclusion.",
    delivery: "Community facilitation and localized Hausa-language formats for rural reach.",
    href: "/about#community",
  },
  {
    number: "08",
    title: "Emerging Tech & Responsible AI",
    description:
      "Ethical artificial intelligence, data privacy safeguards, digital rights awareness, and cybersecurity standards.",
    delivery: "Institutional standards, ethics reviews, and partner capacity-building workshops.",
    href: "/innovation#responsible-tech",
  },
];

export function StrategicPillars() {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Strategic Focus Areas"
          title="Eight Pillars of Sustainable Impact"
          subtitle="Our integrated institutional delivery model connects community reality with technology development, research evidence, and policy dialogue."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.number}
              className="flex flex-col justify-between p-6 rounded-xl border border-slate-200/80 bg-white hover:border-[#265728]/40 hover:shadow-card-hover transition-all duration-200 group"
            >
              <div>
                <span className="text-xs font-black tracking-widest text-[#265728] uppercase bg-[#eaf4eb] px-2.5 py-1 rounded-md">
                  Pillar {pillar.number}
                </span>
                <h3 className="mt-4 text-base font-bold text-slate-900 group-hover:text-[#265728] transition-colors leading-snug">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">
                  {pillar.delivery.slice(0, 30)}...
                </span>
                <Link
                  href={pillar.href}
                  className="text-xs font-semibold text-[#265728] group-hover:underline flex items-center gap-0.5"
                >
                  <span>Details</span>
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
