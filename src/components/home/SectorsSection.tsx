import React from "react";
import Link from "next/link";

const sectors = [
  {
    slug: "agtech",
    name: "AgriTech",
    tagline: "Farming Data & Weather Alerts",
    description: "Crop guidance in Hausa, SMS weather updates, and flood-risk alerts for farming communities.",
  },
  {
    slug: "healthtech",
    name: "HealthTech",
    tagline: "Primary Healthcare Support",
    description: "Digital record systems, health worker digital training, and clinic referral tracking.",
  },
  {
    slug: "edtech",
    name: "EduTech",
    tagline: "Computer Skills for Schools",
    description: "Digital skills for teachers, school coding clubs, and offline learning materials in Hausa.",
  },
  {
    slug: "govtech",
    name: "GovTech",
    tagline: "Public Service Digitisation",
    description: "Civil service training, local government revenue tools, and open government dashboards.",
  },
  {
    slug: "commerce",
    name: "Commerce & MSMEs",
    tagline: "Support for Market Traders",
    description: "Simple bookkeeping tools, digital training, and online marketplaces for local merchants.",
  },
];

export function SectorsSection() {
  return (
    <section className="py-14 sm:py-18 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-3 border-b border-slate-200 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#265728]">
              Key Sectors
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5">
              Five Focus Sectors
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Applying technology where it makes a practical difference to people and businesses in Jigawa.
            </p>
          </div>
          <Link
            href="/sectors"
            className="text-xs sm:text-sm font-bold text-[#265728] hover:underline whitespace-nowrap"
          >
            View All Sectors &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {sectors.map((sector) => (
            <Link
              key={sector.slug}
              href={`/sectors/${sector.slug}`}
              className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-[#265728] hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#265728] bg-[#eaf4eb] px-2 py-0.5 rounded">
                  {sector.name}
                </span>
                <h3 className="text-sm font-bold text-slate-900 mt-2.5 group-hover:text-[#265728] transition-colors">
                  {sector.tagline}
                </h3>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                  {sector.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-[#265728]">
                <span>Strategy</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
