import { supabase } from "@/lib/supabase";
import {
  Program,
  Opportunity,
  ImpactMetric,
  Partner,
  Post,
  Event,
  Product,
  ImpactStory,
} from "@/types";

import {
  getCmsTeam,
  getCmsPartners,
  getCmsPrograms,
  getCmsOpportunities,
  getCmsSettings,
} from "@/lib/cms-store";

export async function getAllPrograms(): Promise<Program[]> {
  try {
    const programs = await getCmsPrograms();
    return programs;
  } catch (err) {
    console.error("Error fetching all programs:", err);
    return [];
  }
}

export async function getOrganizationSettings() {
  try {
    return await getCmsSettings();
  } catch (err) {
    console.error("Error fetching settings:", err);
    return null;
  }
}

export async function getFeaturedPrograms(): Promise<Program[]> {
  try {
    const programs = await getCmsPrograms();
    return programs.filter((p) => p.featured !== false);
  } catch (err) {
    console.error("Error fetching programs:", err);
    return [];
  }
}

export async function getOpenOpportunities(): Promise<Opportunity[]> {
  try {
    const opps = await getCmsOpportunities();
    return opps.filter((o) => o.status === "OPEN");
  } catch (err) {
    console.error("Error fetching opportunities:", err);
    return [];
  }
}

export async function getVerifiedImpactMetrics(): Promise<ImpactMetric[]> {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from("impact_metrics")
      .select("*")
      .eq("verification_status", "VERIFIED")
      .eq("public_visibility", true)
      .order("display_order", { ascending: true });

    if (error || !data) return [];
    return data as unknown as ImpactMetric[];
  } catch {
    return [];
  }
}

export async function getPublicPartners(): Promise<Partner[]> {
  try {
    const partners = await getCmsPartners();
    return partners.filter((p) => p.publicVisibility !== false);
  } catch (err) {
    console.error("Error fetching partners:", err);
    return [];
  }
}

export async function getLatestPosts(): Promise<Post[]> {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("status", "PUBLISHED")
      .order("published_at", { ascending: false })
      .limit(4);

    if (error || !data) return [];
    return data as unknown as Post[];
  } catch {
    return [];
  }
}

export async function getUpcomingEvents(): Promise<Event[]> {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .in("status", ["UPCOMING", "HAPPENING_NOW"])
      .order("start_date_time", { ascending: true })
      .limit(3);

    if (error || !data) return [];
    return data as unknown as Event[];
  } catch {
    return [];
  }
}

export async function getProducts(): Promise<Product[]> {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .neq("status", "ARCHIVED")
      .order("name", { ascending: true });

    if (error || !data) return [];
    return data as unknown as Product[];
  } catch {
    return [];
  }
}

export async function getFeaturedImpactStories(): Promise<ImpactStory[]> {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from("impact_stories")
      .select("*")
      .eq("featured", true)
      .order("created_at", { ascending: false })
      .limit(3);

    if (error || !data) return [];
    return data as unknown as ImpactStory[];
  } catch {
    return [];
  }
}

export async function getTeamMembers(): Promise<import("@/types").TeamMember[]> {
  try {
    const team = await getCmsTeam();
    return team.sort((a, b) => a.displayOrder - b.displayOrder);
  } catch (err) {
    console.error("Error fetching team members:", err);
    return [];
  }

}

