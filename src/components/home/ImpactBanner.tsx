import React from "react";
import Link from "next/link";
import { ImpactMetric } from "@/types";

interface ImpactBannerProps {
  metrics?: ImpactMetric[];
}

export function ImpactBanner({ metrics = [] }: ImpactBannerProps) {
  const verifiedStats =
    metrics.length > 0
      ? metrics
      : [
          {
            id: "m1",
            name: "People Trained",
            category: "Digital and practical skills since 2017",
            displayValue: "50,000+",
            unit: "people",
            sourceReference: "Training Records & LMS",
            verificationStatus: "VERIFIED" as const,
            publicVisibility: true,
            displayOrder: 1,
          },
          {
            id: "m2",
            name: "Years in Operation",
            category: "Working continuously in Dutse",
            displayValue: "9 Years",
            unit: "years",
            sourceReference: "Corporate Affairs Commission",
            verificationStatus: "VERIFIED" as const,
            publicVisibility: true,
            displayOrder: 2,
          },
          {
            id: "m3",
            name: "Innovation Labs",
            category: "Civic tech, research, talent and products",
            displayValue: "4 Labs",
            unit: "centers",
            sourceReference: "Startup Jigawa",
            verificationStatus: "VERIFIED" as const,
            publicVisibility: true,
            displayOrder: 3,
          },
          {
            id: "m4",
            name: "State Coverage",
            category: "Outreach across all local government areas",
            displayValue: "27 LGAs",
            unit: "LGAs",
            sourceReference: "Field Operations Unit",
            verificationStatus: "VERIFIED" as const,
            publicVisibility: true,
            displayOrder: 4,
          },
        ];

  return (
    <section className="bg-[#143216] text-white py-10 sm:py-12 border-b border-[#0e230f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-white/10 gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-300">
              Verified Records
            </span>
          </div>
          <Link
            href="/impact"
            className="text-xs font-semibold text-emerald-200 hover:text-white underline underline-offset-4"
          >
            See How We Measure Our Impact &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {verifiedStats.map((item) => (
            <div key={item.id} className="space-y-1">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                {item.displayValue}
              </div>
              <div className="text-sm font-bold text-emerald-100">
                {item.name}
              </div>
              <div className="text-xs text-emerald-300/80 leading-snug">
                {item.category}
              </div>
              {item.sourceReference && (
                <div className="text-[10px] text-emerald-400/60 uppercase pt-1 font-mono">
                 
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
