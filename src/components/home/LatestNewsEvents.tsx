import React from "react";
import Link from "next/link";
import { Post, Event } from "@/types";
import { NewsCard } from "@/components/ui/NewsCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatDate } from "@/lib/utils";

interface LatestNewsEventsProps {
  posts?: Post[];
  events?: Event[];
}

export function LatestNewsEvents({
  posts = [],
  events = [],
}: LatestNewsEventsProps) {
  const hasPosts = posts.length > 0;
  const hasEvents = events.length > 0;

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <SectionHeader
            badge="News &amp; Events"
            title="Latest Updates &amp; Events"
            subtitle="News announcements, project updates, and upcoming workshops from Startup Jigawa."
            className="mb-0"
          />
          <Link
            href="/news-events"
            className="text-xs sm:text-sm font-bold text-[#265728] hover:underline whitespace-nowrap"
          >
            All Updates &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Latest News Articles (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
              Latest Articles
            </h3>
            {hasPosts ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {posts.slice(0, 2).map((post) => (
                  <NewsCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No Articles Published Yet"
                description="News updates and announcements from our team will appear here."
              />
            )}
          </div>

          {/* Upcoming Events sidebar (1 col) */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
              Upcoming Events &amp; Workshops
            </h3>
            {hasEvents ? (
              <div className="space-y-4">
                {events.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-[#265728]/30 transition-all shadow-subtle"
                  >
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span>{event.mode}</span>
                      <span>{formatDate(event.startDateTime)}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 line-clamp-2 hover:text-[#265728]">
                      <Link href={`/news-events/events/${event.slug}`}>
                        {event.title}
                      </Link>
                    </h4>
                    {event.venue && (
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                        📍 {event.venue}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No Upcoming Events Right Now"
                description="Community workshops, training sessions, and events will be listed as dates are confirmed."
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
