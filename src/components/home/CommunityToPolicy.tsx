import React from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const steps = [
  {
    step: "01",
    name: "Community Listening",
    description: "Talking with farmers, market traders, civil servants, and residents to identify everyday problems.",
  },
  {
    step: "02",
    name: "Understanding the Problem",
    description: "Documenting root causes and separating real community needs from assumptions.",
  },
  {
    step: "03",
    name: "Gathering Field Data",
    description: "Deploying trained local field teams to measure how many people are affected and where.",
  },
  {
    step: "04",
    name: "Analyzing the Evidence",
    description: "Reviewing survey findings to understand the full scope of the challenge.",
  },
  {
    step: "05",
    name: "Checking Back",
    description: "Sharing our initial findings with local communities to confirm we understood correctly.",
  },
  {
    step: "06",
    name: "Designing the Solution",
    description: "Creating practical ideas that work with local connectivity and infrastructure.",
  },
  {
    step: "07",
    name: "Building a Prototype",
    description: "Developing simple, functional tools or programme models to test in practice.",
  },
  {
    step: "08",
    name: "Field Testing",
    description: "Testing solutions with real users across rural and urban local government areas.",
  },
  {
    step: "09",
    name: "Measuring Results",
    description: "Evaluating whether the solution solved the original problem and what needs improvement.",
  },
  {
    step: "10",
    name: "Sharing and Scaling",
    description: "Expanding successful projects or sharing findings and recommendations with government partners.",
  },
];

export function CommunityToPolicy() {
  return (
    <section className="py-16 sm:py-24 bg-[#0a180b] text-white border-b border-emerald-950 overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#265728]/20 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Our Approach"
          title="The Community-to-Policy Pathway"
          subtitle="How Startup Jigawa turns community feedback into practical technology, research, and policy recommendations."
          className="[&_h2]:text-white [&_p]:text-emerald-100/80 [&_span]:bg-[#265728] [&_span]:text-emerald-200"
        />

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className="relative p-5 rounded-xl bg-white/5 border border-emerald-500/20 backdrop-blur-sm hover:border-emerald-400/50 hover:bg-white/10 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-mono font-bold text-emerald-400 text-sm">
                    {item.step}
                  </span>
                  {index < steps.length - 1 && (
                    <span className="hidden lg:inline text-emerald-600 font-bold">
                      &rarr;
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {item.name}
                </h4>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-emerald-900/60 text-[10px] text-emerald-400/80 uppercase tracking-widest">
                Stage {index + 1} of 10
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-emerald-200/80 max-w-2xl mx-auto">
            This 10-step approach ensures that every project we work on addresses a real, verified community need.
          </p>
        </div>
      </div>
    </section>
  );
}
