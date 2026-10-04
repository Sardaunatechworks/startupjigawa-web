import React from "react";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-r from-[#143216] via-[#1b411d] to-[#265728] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-emerald-300 bg-white/10 px-3 py-1 rounded-full mb-4">
          Work With Us
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white max-w-3xl mx-auto leading-tight">
          Work With Startup Jigawa
        </h2>
        <p className="mt-4 text-sm sm:text-base text-emerald-100 max-w-2xl mx-auto leading-relaxed">
          Whether you want to collaborate on a community project, train young people in practical digital skills, or apply for our programmes, we would like to hear from you.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            href="/opportunities"
            variant="gold"
            size="lg"
            className="w-full sm:w-auto font-bold"
          >
            View Current Opportunities
          </Button>
          <Button
            href="/contact?type=PARTNERSHIP"
            variant="outline"
            size="lg"
            className="w-full sm:w-auto text-white border-white hover:bg-white/10"
          >
            Get in Touch With Us
          </Button>
        </div>
      </div>
    </section>
  );
}
