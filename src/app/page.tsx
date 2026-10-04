import { PublicLayout } from "@/components/layout/PublicLayout";
import { HeroSection } from "@/components/home/HeroSection";
import { ImpactBanner } from "@/components/home/ImpactBanner";
import { CoreFocusSection } from "@/components/home/CoreFocusSection";
import { DualPortalShowcase } from "@/components/home/DualPortalShowcase";
import { SectorsSection } from "@/components/home/SectorsSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { HomeTeamSection } from "@/components/home/HomeTeamSection";
import { LatestNewsEvents } from "@/components/home/LatestNewsEvents";
import { CTASection } from "@/components/home/CTASection";
import {
  getFeaturedPrograms,
  getVerifiedImpactMetrics,
  getPublicPartners,
  getLatestPosts,
  getUpcomingEvents,
  getProducts,
  getTeamMembers,
  getOrganizationSettings,
} from "@/lib/data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  // Fetch dynamic CMS data (or empty arrays where not yet seeded)
  const [
    programs,
    metrics,
    partners,
    posts,
    events,
    products,
    teamMembers,
    settings,
  ] = await Promise.all([
    getFeaturedPrograms(),
    getVerifiedImpactMetrics(),
    getPublicPartners(),
    getLatestPosts(),
    getUpcomingEvents(),
    getProducts(),
    getTeamMembers(),
    getOrganizationSettings(),
  ]);

  return (
    <PublicLayout>
      {/* 1. Official Editorial Hero & Dynamic Transparent Background */}
      <HeroSection hero={settings?.hero} />

      {/* 2. Verified Track Record & M&E Metrics Band */}
      <ImpactBanner metrics={metrics} />

      {/* 3. Core Strategic Focus Areas (Skills Academy, Civic Tech, Labs, Research) */}
      <CoreFocusSection />

      {/* 4. Active Programs & Homegrown Products (Portal Split View) */}
      <DualPortalShowcase programs={programs} products={products} />

      {/* 5. Core Development Sectors Overview */}
      <SectorsSection />

      {/* 6. Meet Our Team & Leadership Section */}
      <HomeTeamSection team={teamMembers} />

      {/* 7. Strategic & Intergovernmental Partners */}
      <PartnersSection partners={partners} />

      {/* 8. Institutional Newsroom & Upcoming Convenings */}
      <LatestNewsEvents posts={posts} events={events} />

      {/* 9. Direct Engagement & Dutse Hub CTA */}
      <CTASection />
    </PublicLayout>
  );
}
