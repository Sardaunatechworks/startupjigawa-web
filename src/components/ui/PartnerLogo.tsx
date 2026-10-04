import React from "react";
import { Partner } from "@/types";

interface PartnerLogoProps {
  partner: Partner;
  showCategory?: boolean;
}

// Dedicated emblems for official institutional partners when logoUrl is not provided
function PartnerEmblem({ slug, name }: { slug: string; name: string }) {
  if (slug === "jigawa-state-government") {
    return (
      <div className="w-14 h-14 rounded-full bg-[#eaf4eb] border-2 border-[#265728] flex flex-col items-center justify-center text-[#265728] shadow-xs">
        <span className="text-[10px] font-black uppercase tracking-tighter">JIGAWA</span>
        <span className="text-[8px] font-bold">STATE</span>
      </div>
    );
  }
  if (slug === "nitda") {
    return (
      <div className="w-14 h-14 rounded-xl bg-slate-900 border border-slate-700 flex flex-col items-center justify-center text-white shadow-xs">
        <span className="text-xs font-black tracking-widest text-emerald-400">NITDA</span>
        <span className="text-[7px] text-slate-300 uppercase tracking-tighter">NIGERIA</span>
      </div>
    );
  }
  if (slug === "fmcide") {
    return (
      <div className="w-14 h-14 rounded-full bg-[#1b411d] border border-emerald-600 flex flex-col items-center justify-center text-white shadow-xs">
        <span className="text-[9px] font-black tracking-wider text-emerald-300">FMCIDE</span>
        <span className="text-[7px] text-slate-200">FEDERAL</span>
      </div>
    );
  }
  if (slug === "jica") {
    return (
      <div className="w-14 h-14 rounded-xl bg-[#0d315e] border border-blue-400 flex flex-col items-center justify-center text-white shadow-xs">
        <span className="text-sm font-black tracking-wider text-blue-200">JICA</span>
        <span className="text-[7px] text-blue-100 uppercase tracking-tighter">JAPAN</span>
      </div>
    );
  }
  if (slug === "ogp-jigawa") {
    return (
      <div className="w-14 h-14 rounded-full bg-amber-50 border-2 border-amber-600 flex flex-col items-center justify-center text-amber-900 shadow-xs">
        <span className="text-xs font-black tracking-tight text-amber-700">OGP</span>
        <span className="text-[7px] font-bold text-amber-800 uppercase tracking-tighter">JIGAWA</span>
      </div>
    );
  }
  if (slug === "3mtt") {
    return (
      <div className="w-14 h-14 rounded-xl bg-[#265728] border border-emerald-400 flex flex-col items-center justify-center text-white shadow-xs">
        <span className="text-xs font-black tracking-tight text-emerald-200">3MTT</span>
        <span className="text-[7px] text-white/90 uppercase tracking-tighter">TALENT</span>
      </div>
    );
  }
  if (slug === "njfp") {
    return (
      <div className="w-14 h-14 rounded-xl bg-teal-900 border border-teal-500 flex flex-col items-center justify-center text-white shadow-xs">
        <span className="text-xs font-black tracking-tight text-teal-200">NJFP</span>
        <span className="text-[7px] text-teal-100 uppercase tracking-tighter">FELLOWS</span>
      </div>
    );
  }

  // Fallback initial badge
  return (
    <div className="w-14 h-14 rounded-xl bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-700 font-bold text-sm shadow-xs">
      {name.substring(0, 3).toUpperCase()}
    </div>
  );
}

export function PartnerLogo({ partner }: PartnerLogoProps) {
  const content = (
    <div className="flex flex-col items-center justify-center text-center group py-2 px-1 transition-transform duration-200 hover:-translate-y-0.5">
      {/* Partner Logo */}
      <div className="h-16 flex items-center justify-center mb-2">
        {partner.logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={partner.logoUrl}
            alt={partner.name}
            className="max-h-14 max-w-[130px] object-contain filter grayscale group-hover:grayscale-0 transition-all opacity-85 group-hover:opacity-100"
          />
        ) : (
          <PartnerEmblem slug={partner.slug} name={partner.name} />
        )}
      </div>

      {/* Partner Name Below */}
      <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#265728] transition-colors line-clamp-2 leading-tight max-w-[130px]">
        {partner.name}
      </span>
    </div>
  );

  if (partner.websiteUrl) {
    return (
      <a
        href={partner.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={partner.name}
        className="block"
      >
        {content}
      </a>
    );
  }

  return <div>{content}</div>;
}
