import React from "react";
import { Metadata } from "next";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { LatestNewsEvents } from "@/components/home/LatestNewsEvents";
import { getLatestPosts, getUpcomingEvents } from "@/lib/data";

export const metadata: Metadata = {
  title: "Newsroom, Press Statements & Events",
  description:
    "Official press releases, project milestones, research releases, and upcoming civic tech forums from Startup Jigawa.",
};

export default async function NewsEventsPage() {
  const [posts, events] = await Promise.all([
    getLatestPosts(),
    getUpcomingEvents(),
  ]);

  return (
    <PublicLayout>
      <PageHeader
        badge="News &amp; Events"
        title="News and Events"
        description="Latest updates, announcements, and upcoming workshops from Startup Jigawa."
        breadcrumbs={[{ label: "News & Events" }]}
      />

      <LatestNewsEvents posts={posts} events={events} />
    </PublicLayout>
  );
}
