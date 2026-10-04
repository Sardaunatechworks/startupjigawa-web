import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export interface HeroSectionProps {
  hero?: {
    title?: string;
    description?: string;
    backgroundImage?: string;
    backgroundOpacity?: number;
    enableAnimation?: boolean;
  };
}

export function HeroSection({ hero }: HeroSectionProps) {
  const title =
    hero?.title ||
    "Building Practical Skills, Supporting Local Ideas, and Strengthening Communities in Jigawa";

  const description =
    hero?.description ||
    "Startup Jigawa is a technology and innovation centre in Dutse. Over the past nine years, we have trained more than 50,000 people in practical digital skills, built technology tools for local challenges, and collaborated with government and community partners across the state.";

  const hasBgImage = Boolean(hero?.backgroundImage && hero.backgroundImage.trim().length > 0);
  const opacityVal = (hero?.backgroundOpacity ?? 20) / 100;
  const isAnimated = hero?.enableAnimation ?? true;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f4f8f4] via-[#fafdfa] to-white border-b border-slate-200">
      {/* 1. Transparent Background Layer (Driven dynamically by Admin CMS) */}
      {hasBgImage ? (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={hero!.backgroundImage}
            alt=""
            aria-hidden="true"
            style={{ opacity: opacityVal }}
            className={cn(
              "w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out",
              isAnimated ? "animate-kenburns" : ""
            )}
          />
          {/* Dual-axis gradient masks to ensure 100% text readability and contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-white" />
        </div>
      ) : (
        /* Subtle animated ambient mesh orbs when no image is uploaded */
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-100/40 blur-3xl animate-pulse" />
          <div className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-amber-50/50 blur-3xl animate-pulse delay-1000" />
        </div>
      )}

      {/* 2. Foreground Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="space-y-6 text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.18] transition-all">
            {title.includes("Strengthening Communities") ? (
              <>
                {title.split("Strengthening Communities")[0]}
                <span className="text-[#265728]">Strengthening Communities</span>
                {title.split("Strengthening Communities")[1]}
              </>
            ) : (
              title
            )}
          </h1>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-3xl font-normal drop-shadow-2xs">
            {description}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            <Button href="/programs" variant="primary" size="lg" className="font-bold text-sm shadow-sm hover:shadow-md transition-shadow">
              Explore Our Programmes &rarr;
            </Button>
            <Button href="/contact?type=PARTNERSHIP" variant="outline" size="lg" className="font-bold text-sm bg-white/80 backdrop-blur-xs">
              Partner With Us
            </Button>
            <Link
              href="/about"
              className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#265728] underline underline-offset-4 ml-1 transition-colors"
            >
              About Startup Jigawa
            </Link>
          </div>

          {/* Key verification points */}
          <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-600">
            <span className="flex items-center gap-1.5 font-medium text-slate-800">
              <span className="text-[#265728] font-bold">✓</span> State &amp; Federal Partner
            </span>
            <span className="flex items-center gap-1.5 font-medium text-slate-800">
              <span className="text-[#265728] font-bold">✓</span> 50,000+ People Trained
            </span>
            <span className="flex items-center gap-1.5 font-medium text-slate-800">
              <span className="text-[#265728] font-bold">✓</span> 9 Years in Dutse
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}