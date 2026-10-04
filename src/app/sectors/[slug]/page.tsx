import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";

interface SectorDetail {
  slug: string;
  name: string;
  tagline: string;
  overview: string;
  challenges: string[];
  initiatives: string[];
  beneficiaries: string[];
}

const sectorData: Record<string, SectorDetail> = {
  agtech: {
    slug: "agtech",
    name: "Agricultural Technology (AgriTech)",
    tagline: "Empowering Smallholder Productivity & Rural Value Chains",
    overview:
      "Jigawa State's economy is predominantly agrarian. Our AgriTech intervention deploys digital enumeration, Hausa-language SMS/USSD advisory systems, produce market linkage platforms, and flood resilience mapping along the Hadejia-Jama'are river basin.",
    challenges: [
      "Fragmented, informal farm data and lack of smallholder credit profiling.",
      "Vulnerability to seasonal flooding and unpredictable weather shifts.",
      "Middleman price exploitation and limited direct market access for rural produce.",
    ],
    initiatives: [
      "Smallholder farmer digital registration and farm mapping.",
      "Hausa-language SMS/USSD micro-advisory and flood warning broadcasts.",
      "Digital marketplace linkage pilots connecting rural producer cooperatives with urban buyers.",
    ],
    beneficiaries: [
      "Smallholder grain, sesame, and rice farmers across all 27 LGAs.",
      "Agricultural extension workers and cooperative leaders.",
      "Agribusiness processors and regional distributors.",
    ],
  },
  healthtech: {
    slug: "healthtech",
    name: "Health Technology (HealthTech)",
    tagline: "Bridging Primary Healthcare Data & Rural Facilities",
    overview:
      "Rural primary healthcare centers often struggle with paper-based reporting, delayed supply replenishment, and isolated health extension workers. Our HealthTech work develops lightweight, low-connectivity data systems.",
    challenges: [
      "Paper-based records leading to delayed epidemiological response and vaccine stockouts.",
      "Limited technical capacity among frontline community health extension workers.",
      "High rural maternal and infant mortality requiring reliable referral mechanisms.",
    ],
    initiatives: [
      "Primary health center digitization and inventory tracking pilots.",
      "Digital health literacy accreditation for community health extension workers.",
      "Mobile emergency referral networks connecting rural clinics with general hospitals.",
    ],
    beneficiaries: [
      "Primary healthcare workers and village clinic facilitators.",
      "Rural mothers, infants, and vulnerable households.",
      "State Ministry of Health and Primary Healthcare Development Agency.",
    ],
  },
  edtech: {
    slug: "edtech",
    name: "Educational Technology (EduTech)",
    tagline: "Localized Digital Learning & Youth Technology Clubs",
    overview:
      "Equipping public secondary schools and non-formal learning centers with offline-capable digital curricula, teacher ICT certification, and Hausa-language STEM learning materials.",
    challenges: [
      "Severe broadband and electrical constraints in rural public secondary schools.",
      "Shortage of qualified computer science and digital literacy educators.",
      "Language barriers in standard English-only digital educational content.",
    ],
    initiatives: [
      "School coding clubs and extracurricular robotics/digital design workshops.",
      "Teacher digital upskilling and instructional design accreditation.",
      "Development of offline-first, low-data Hausa-language STEM content repositories.",
    ],
    beneficiaries: [
      "Public secondary school students across rural and urban LGAs.",
      "Classroom teachers and school ICT lab administrators.",
      "State Ministry of Education, Science & Technology.",
    ],
  },
  govtech: {
    slug: "govtech",
    name: "Government Technology (GovTech)",
    tagline: "Modernizing Public Service Delivery & Fiscal Transparency",
    overview:
      "Partnering with state ministries, departments, agencies, and local government councils to digitize administrative workflows, enhance internal capacity, and publish verified open governance data.",
    challenges: [
      "Legacy manual filing systems leading to delayed inter-agency communication.",
      "Sub-optimal local government revenue tracking and leakages.",
      "Gaps in civil service technological literacy required for modern governance.",
    ],
    initiatives: [
      "Civil service executive digital literacy and workflow optimization academies.",
      "LGA revenue digitization consulting and transparent receipting systems.",
      "Open Government Partnership (OGP) civic data dashboards for public tracking.",
    ],
    beneficiaries: [
      "Civil servants across State MDAs and 27 Local Government Councils.",
      "State leadership, fiscal auditors, and revenue collection authorities.",
      "Citizens seeking transparent access to public service information.",
    ],
  },
  commerce: {
    slug: "commerce",
    name: "Digital Commerce & MSMEs",
    tagline: "Digitizing Informal Trade & Market Access for Northern Entrepreneurs",
    overview:
      "Bringing Dutse, Hadejia, Gumel, and Kazaure traditional markets into the digital economy through bookkeeping tools, digital payments, and e-commerce linkage platforms like Yankasuwa.",
    challenges: [
      "Informal traders lack digital transaction records required for formal bank financing.",
      "Limited access to regional e-commerce markets beyond immediate municipal borders.",
      "High cost and complexity of existing proprietary commercial software for micro-enterprises.",
    ],
    initiatives: [
      "Market-hub digital onboarding clinics for artisans, grain traders, and craft producers.",
      "Yankasuwa digital commerce platform incubation and merchant training.",
      "Financial literacy and digital payments integration for women-led cooperatives.",
    ],
    beneficiaries: [
      "Informal market stallholders and micro-retailers.",
      "Youth and women artisans and agro-processors.",
      "Commercial banks and microfinance institutions seeking creditworthy MSMEs.",
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(sectorData).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sector = sectorData[slug];
  if (!sector) return { title: "Sector Not Found" };
  return {
    title: `${sector.name} | Strategic Sectors`,
    description: sector.overview,
  };
}

export default async function SectorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sector = sectorData[slug];

  if (!sector) {
    notFound();
  }

  return (
    <PublicLayout>
      <PageHeader
        badge="Development Sector"
        title={sector.name}
        description={sector.tagline}
        breadcrumbs={[
          { label: "Sectors", href: "/sectors" },
          { label: sector.name },
        ]}
      />

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">
                  Sector Overview &amp; Context
                </h2>
                <p className="text-base text-slate-700 leading-relaxed">
                  {sector.overview}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Documented Challenges Addressed
                </h3>
                <div className="space-y-2.5">
                  {sector.challenges.map((c, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 flex items-start gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                        !
                      </span>
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Active &amp; Planned Interventions
                </h3>
                <div className="space-y-2.5">
                  {sector.initiatives.map((init, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#f3f9f4] border border-[#265728]/20 text-xs sm:text-sm text-slate-700 flex items-start gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#265728] text-white font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                        ✓
                      </span>
                      <span>{init}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-subtle space-y-4">
                <h4 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
                  Target Beneficiaries
                </h4>
                <ul className="space-y-2 text-xs text-slate-600">
                  {sector.beneficiaries.map((b, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#265728]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-slate-200">
                  <Button
                    href={`/contact?type=PARTNERSHIP&subject=${encodeURIComponent(sector.name)}`}
                    variant="primary"
                    size="sm"
                    className="w-full justify-center"
                  >
                    Partner on {sector.slug.toUpperCase()} Initiatives &rarr;
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
