import React from "react";
import Link from "next/link";
import { ImpactStory } from "@/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EmptyState } from "@/components/ui/EmptyState";

interface ImpactStoriesSectionProps {
  stories?: ImpactStory[];
}

export function ImpactStoriesSection({
  stories = [],
}: ImpactStoriesSectionProps) {
  const hasStories = stories.length > 0;

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <SectionHeader
            badge="Stories"
            title="Stories From Our Work"
            subtitle="Real experiences of young people, local businesses, and communities participating in our programmes."
            className="mb-0"
          />
          <Link
            href="/impact#stories"
            className="text-xs sm:text-sm font-bold text-[#265728] hover:underline whitespace-nowrap"
          >
            All Stories &rarr;
          </Link>
        </div>

        {hasStories ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <div
                key={story.id}
                className="p-6 rounded-xl border border-slate-200 bg-white hover:border-[#265728]/40 hover:shadow-card-hover transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#265728] bg-[#eaf4eb] px-2 py-0.5 rounded">
                    {story.programName || "Impact Case"}
                  </span>
                  <h3 className="mt-3 text-lg font-bold text-slate-900 leading-snug">
                    <Link href={`/impact/stories/${story.slug}`}>
                      {story.title}
                    </Link>
                  </h3>
                  <div className="mt-3 space-y-2 text-xs">
                    <div>
                      <span className="font-semibold text-slate-700">
                        Challenge:
                      </span>{" "}
                      <span className="text-slate-500 line-clamp-2">
                        {story.challenge}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-700">
                        Outcome:
                      </span>{" "}
                      <span className="text-slate-600 font-medium line-clamp-2">
                        {story.outcome}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400">
                    Participants: {story.participants}
                  </span>
                  <Link
                    href={`/impact/stories/${story.slug}`}
                    className="font-bold text-[#265728] hover:underline"
                  >
                    Read Story &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Stories Published Yet"
            description="Stories and experiences from our programme participants will appear here soon."
            actionLabel="See How We Measure Impact"
            actionHref="/impact"
          />
        )}
      </div>
    </section>
  );
}
