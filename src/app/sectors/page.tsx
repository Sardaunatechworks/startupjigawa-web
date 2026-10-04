import React from "react";
import { Metadata } from "next";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectorsSection } from "@/components/home/SectorsSection";

export const metadata: Metadata = {
  title: "Core Development Sectors",
  description:
    "Explore Startup Jigawa's targeted digital interventions across AgriTech, HealthTech, EduTech, GovTech, and MSME Commerce.",
};

export default function SectorsPage() {
  return (
    <PublicLayout>
      <PageHeader
        badge="Key Sectors"
        title="Focus Sectors"
        description="We focus our training, technology tools, and field research on sectors that directly affect families, workers, and businesses in Jigawa."
        breadcrumbs={[{ label: "Sectors" }]}
      />

      <SectorsSection />
    </PublicLayout>
  );
}
