import React from "react";
import Link from "next/link";
import { Partner } from "@/types";
import { PartnerLogo } from "@/components/ui/PartnerLogo";

interface PartnersSectionProps {
  partners?: Partner[];
}

export function PartnersSection({ partners }: PartnersSectionProps) {
  const displayPartners: Partner[] = partners ?? [];

  return (
    <section className="py-14 sm:py-18 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-3 border-b border-slate-200 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#265728]">
              Our Partners
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5">
              Partners &amp; Collaborators
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              We work with state and federal ministries, development agencies, and national initiatives to deliver programmes across Jigawa.
            </p>
          </div>
          <Link
            href="/partners"
            className="text-xs sm:text-sm font-bold text-[#265728] hover:underline whitespace-nowrap"
          >
            How We Partner &rarr;
          </Link>
        </div>

        {displayPartners.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 sm:gap-8 items-start justify-items-center py-4">
            {displayPartners.map((partner) => (
              <PartnerLogo
                key={partner.id}
                partner={partner}
              />
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-slate-500 text-xs">
            No institutional partners currently published.
          </div>
        )}

        <div className="mt-8 p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs sm:text-sm font-bold text-slate-800">
              Interested in Partnering With Us?
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              We collaborate with government bodies, development agencies, and private organisations on training, community research, and technology projects.
            </p>
          </div>
          <Link
            href="/contact?type=PARTNERSHIP"
            className="px-4 py-2 rounded-lg bg-[#265728] hover:bg-[#1b411d] text-white text-xs font-bold whitespace-nowrap shadow-sm transition-colors"
          >
            Contact Our Team &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
