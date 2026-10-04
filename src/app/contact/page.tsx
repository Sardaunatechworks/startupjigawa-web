import React from "react";
import { Metadata } from "next";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactClient } from "@/components/contact/ContactClient";
import { getOrganizationSettings } from "@/lib/data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Startup Jigawa for inquiries about programmes, partnerships, or civic tech initiatives.",
};

export default async function ContactPage() {
  const settings = await getOrganizationSettings();

  return (
    <PublicLayout>
      <PageHeader
        badge="Contact Us"
        title="Contact Us"
        description="Get in touch with us with questions about our programmes, partnerships, or field research in Jigawa State."
        breadcrumbs={[{ label: "Contact" }]}
      />

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactClient initialSettings={settings} />
        </div>
      </section>
    </PublicLayout>
  );
}
