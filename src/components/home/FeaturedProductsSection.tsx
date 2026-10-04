import React from "react";
import Link from "next/link";
import { Product } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface FeaturedProductsSectionProps {
  products?: Product[];
}

export function FeaturedProductsSection({
  products = [],
}: FeaturedProductsSectionProps) {
  // Official products from Organizational Profile with verified lifecycle status
  const displayProducts: Product[] = products.length > 0
    ? products
    : [
        {
          id: "p1",
          name: "RentHouse",
          slug: "renthouse",
          tagline: "Property and Rental Listings for Dutse",
          description:
            "Helps tenants, civil servants, and landlords find and list rental accommodation with verified details.",
          status: "PILOT",
          targetUsers: "Tenants, landlords, civil servants.",
          featured: true,
        },
        {
          id: "p2",
          name: "SoftDeliver",
          slug: "softdeliver",
          tagline: "Local Delivery Dispatch Tool",
          description:
            "Connects dispatch riders, local food vendors, and customers to handle everyday deliveries in Dutse.",
          status: "PROTOTYPE",
          targetUsers: "Local shops, riders, shoppers.",
          featured: true,
        },
        {
          id: "p3",
          name: "PrepAI",
          slug: "prepai",
          tagline: "Offline Study & Exam Practice",
          description:
            "Study materials and practice quizzes for secondary school students preparing for WAEC and UTME, designed for low-connectivity environments.",
          status: "PROTOTYPE",
          targetUsers: "Secondary school students, UTME/WAEC candidates, teachers.",
          featured: true,
        },
        {
          id: "p4",
          name: "Yankasuwa",
          slug: "yankasuwa",
          tagline: "Digital Tools for Market Traders",
          description:
            "Helps traditional market traders and artisans create simple online storefronts and track their sales.",
          status: "PILOT",
          targetUsers: "Market traders, youth artisans, small businesses.",
          featured: true,
        },
      ];

  const statusBadgeVariant: Record<string, "success" | "warning" | "info" | "neutral" | "brand"> = {
    CONCEPT: "neutral",
    RESEARCH: "info",
    PROTOTYPE: "warning",
    PILOT: "brand",
    LIVE: "success",
    PAUSED: "neutral",
    ARCHIVED: "neutral",
  };

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Digital Tools"
          title="Tools Built for Jigawa"
          subtitle="Digital platforms created to solve specific local challenges, with transparent development statuses."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayProducts.map((product) => (
            <div
              key={product.id}
              className="p-6 sm:p-7 rounded-xl bg-white border border-slate-200 shadow-subtle hover:border-[#265728]/40 hover:shadow-card-hover transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Digital Tool
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">
                      Status:
                    </span>
                    <Badge variant={statusBadgeVariant[product.status] || "neutral"}>
                      {product.status}
                    </Badge>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  {product.name}
                </h3>
                <p className="mt-1 text-xs font-semibold text-[#265728]">
                  {product.tagline}
                </p>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {product.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 text-xs">
                  <span className="font-semibold text-slate-700">Intended Users:</span>{" "}
                  <span className="text-slate-500">{product.targetUsers}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 italic text-[11px]">
                  Product Innovation Lab
                </span>
                <Link
                  href={`/innovation#${product.slug}`}
                  className="font-bold text-[#265728] hover:underline flex items-center gap-1"
                >
                  <span>Overview</span>
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
