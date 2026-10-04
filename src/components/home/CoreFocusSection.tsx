import React from "react";
import Link from "next/link";

const corePillars = [
  {
    title: "Digital Skills Academy",
    tagline: "Practical Training for Work",
    description:
      "Diploma courses and national programmes (including 3MTT) in software engineering, data analysis, and cybersecurity, helping young people in Jigawa build careers in technology.",
    badge: "50,000+ Trained",
    href: "/programs",
    cta: "View Courses & Diplomas",
    iconText: "01",
  },
  {
    title: "Civic Technology & Open Governance",
    tagline: "Citizen Feedback & Transparency",
    description:
      "Working with OGP Jigawa and community groups to build digital tools that make public information accessible, collect citizen feedback, and improve public services.",
    badge: "OGP Partner",
    href: "/innovation#civic-tech",
    cta: "View Civic Projects",
    iconText: "02",
  },
  {
    title: "Innovation Labs & Incubation",
    tagline: "Agriculture, Health & Climate",
    description:
      "Supporting local ideas and developing digital tools for everyday challenges—including flood risk alerts for riverine communities and tools for small businesses.",
    badge: "4 Active Labs",
    href: "/innovation#labs",
    cta: "View Labs & Products",
    iconText: "03",
  },
  {
    title: "Field Research & Data",
    tagline: "Information for Better Decisions",
    description:
      "Working with trained field enumerators across all 27 Local Government Areas of Jigawa State to conduct community surveys, baseline studies, and project reviews.",
    badge: "27 LGAs Covered",
    href: "/research",
    cta: "Read Research Reports",
    iconText: "04",
  },
];

export function CoreFocusSection() {
  return (
    <section className="py-14 sm:py-18 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#265728]">
              What We Do
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Core Focus Areas
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Connecting community needs with practical technology, local research, and government partnerships.
            </p>
          </div>
          <Link
            href="/about"
            className="text-xs sm:text-sm font-bold text-[#265728] hover:underline whitespace-nowrap"
          >
            About Our Approach &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {corePillars.map((pillar) => (
            <div
              key={pillar.title}
              className="flex flex-col justify-between p-6 rounded-xl border border-slate-200 bg-white hover:border-[#265728]/50 hover:shadow-md transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#eaf4eb] text-[#265728] font-black text-sm flex items-center justify-center">
                    {pillar.iconText}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
                    {pillar.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#265728] transition-colors leading-snug">
                  {pillar.title}
                </h3>
                <div className="text-xs font-semibold text-[#c28829] mt-0.5 mb-2">
                  {pillar.tagline}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <Link
                  href={pillar.href}
                  className="text-xs font-bold text-[#265728] group-hover:text-[#1b411d] flex items-center justify-between"
                >
                  <span>{pillar.cta}</span>
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
