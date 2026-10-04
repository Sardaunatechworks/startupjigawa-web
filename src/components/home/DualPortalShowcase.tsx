import React from "react";
import Link from "next/link";
import { Program, Product } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

interface DualPortalShowcaseProps {
  programs?: Program[];
  products?: Product[];
}

export function DualPortalShowcase({
  programs = [],
  products = [],
}: DualPortalShowcaseProps) {
  // Official products from Organizational Profile with honest lifecycle badges
  const displayProducts: Product[] = products.length > 0
    ? products
    : [
        {
          id: "prod-1",
          name: "RentHouse",
          slug: "renthouse",
          tagline: "Property and Rental Listings for Dutse",
          description: "Making it easier for tenants, civil servants, and landlords to find and list rental accommodation with verified information.",
          status: "PILOT",
          targetUsers: "Tenants, landlords, civil servants",
          featured: true,
        },
        {
          id: "prod-2",
          name: "SoftDeliver",
          slug: "softdeliver",
          tagline: "Local Delivery Dispatch Tool",
          description: "Connecting dispatch riders, retail vendors, and customers to handle everyday deliveries in Dutse and nearby towns.",
          status: "PROTOTYPE",
          targetUsers: "Local shops, riders, shoppers",
          featured: true,
        },
        {
          id: "prod-3",
          name: "PrepAI",
          slug: "prepai",
          tagline: "Offline Study & Exam Practice",
          description: "Practice questions and study materials for students preparing for WAEC and UTME, designed to work in low-connectivity areas.",
          status: "PROTOTYPE",
          targetUsers: "Secondary school students, UTME/WAEC candidates",
          featured: true,
        },
        {
          id: "prod-4",
          name: "Yankasuwa",
          slug: "yankasuwa",
          tagline: "Digital Tools for Market Traders",
          description: "Helping traditional market traders and local craft makers record sales and connect with more customers.",
          status: "PILOT",
          targetUsers: "Market traders, youth artisans",
          featured: true,
        },
      ];

  const statusVariants: Record<string, "success" | "warning" | "info" | "neutral" | "brand"> = {
    PILOT: "brand",
    PROTOTYPE: "warning",
    CONCEPT: "neutral",
    LIVE: "success",
  };

  return (
    <section className="py-14 sm:py-18 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Active Programs & Calls */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#265728]">
                  Training Programmes
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                  Programmes &amp; Open Calls
                </h3>
              </div>
              <Link
                href="/programs"
                className="text-xs font-bold text-[#265728] hover:underline"
              >
                All Programmes &rarr;
              </Link>
            </div>

            {programs.length > 0 ? (
              <div className="space-y-3">
                {programs.slice(0, 3).map((prog) => (
                  <div
                    key={prog.id}
                    className="p-4 rounded-xl bg-white border border-slate-200 shadow-subtle hover:border-[#265728]/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold text-[#265728] uppercase text-[10px]">
                          {prog.category}
                        </span>
                        <Badge variant="brand">{prog.status}</Badge>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 line-clamp-1 hover:text-[#265728]">
                        <Link href={`/programs/${prog.slug}`}>{prog.title}</Link>
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                        {prog.summary}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>
                        Deadline: {prog.deadline ? formatDate(prog.deadline) : "Open"}
                      </span>
                      <Link
                        href={`/programs/${prog.slug}`}
                        className="font-bold text-[#265728] hover:underline"
                      >
                        Details &rarr;
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-white border border-dashed border-slate-200 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-[#eaf4eb] text-[#265728] flex items-center justify-center mx-auto text-sm font-bold">
                  SJ
                </div>
                <h4 className="text-sm font-bold text-slate-800">
                  New Cohorts Coming Soon
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Applications for our upcoming software engineering, data analysis, and 3MTT cohorts will open here.
                </p>
                <div className="pt-2">
                  <Link
                    href="/opportunities"
                    className="inline-block px-4 py-2 rounded-lg bg-[#265728] hover:bg-[#1b411d] text-white text-xs font-bold transition-colors shadow-sm"
                  >
                    View Current Opportunities &rarr;
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Homegrown Platforms */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#265728]">
                  Digital Tools
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                  Tools Built for Jigawa
                </h3>
              </div>
              <Link
                href="/innovation#products"
                className="text-xs font-bold text-[#265728] hover:underline"
              >
                All Products &rarr;
              </Link>
            </div>

            <div className="space-y-3">
              {displayProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="p-4 rounded-xl bg-white border border-slate-200 shadow-subtle hover:border-[#265728]/40 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900 hover:text-[#265728]">
                          <Link href={`/innovation#${prod.slug}`}>{prod.name}</Link>
                        </h4>
                        <span className="text-[10px] text-slate-400 font-medium">
                          &middot; {prod.targetUsers}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                        {prod.description}
                      </p>
                    </div>

                    <div className="shrink-0 flex flex-col items-end">
                      <Badge variant={statusVariants[prod.status] || "neutral"}>
                        {prod.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400 italic">
                      {prod.tagline}
                    </span>
                    <Link
                      href={`/innovation#${prod.slug}`}
                      className="text-xs font-bold text-[#265728] hover:underline"
                    >
                      Overview &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
