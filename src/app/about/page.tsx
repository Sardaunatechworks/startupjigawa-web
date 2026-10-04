import React from "react";
import { Metadata } from "next";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { siteConfig } from "@/config/site";
import { TeamMemberCard } from "@/components/ui/TeamMemberCard";
import { getTeamMembers } from "@/lib/data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "About Us | Institutional Profile & Leadership",
  description:
    "Startup Jigawa Ltd is Northern Nigeria's premier institutional technology and civic innovation company, incorporated under RC 7256149 with 9 years of active operation.",
};

export default async function AboutPage() {
  const teamMembers = await getTeamMembers();

  const values = [
    {
      title: "Practicality",
      description:
        "Solutions are architected around documented, real-world problems and localized infrastructure realities, never abstract assumptions.",
    },
    {
      title: "Community First",
      description:
        "Every program, civic platform, and training pathway is co-designed with and validated by the communities and local stakeholders it serves.",
    },
    {
      title: "Empirical Evidence",
      description:
        "All claims of impact, reach, and outcome are backed by verified data collected through structured monitoring and evaluation frameworks.",
    },
    {
      title: "Institutional Integrity",
      description:
        "Sound corporate governance, documented audits, strict data protection, and clear conflict-of-interest safeguards underpin all operations.",
    },
    {
      title: "Systemic Integration",
      description:
        "Technology, civic participation, empirical research, and institutional policy are most powerful when seamlessly connected rather than siloed.",
    },
  ];

  return (
    <PublicLayout>
      <PageHeader
        badge="About Us"
        title="Building Skills, Supporting Ideas, and Strengthening Communities in Jigawa"
        description="Startup Jigawa Ltd is an innovation hub based in Dutse. We work with young people, businesses, and public institutions to build practical digital skills and local technology solutions."
        breadcrumbs={[{ label: "About Us" }]}
      />

      {/* Corporate Summary & Legal Status */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Nine Years of Work in Jigawa State
              </h2>
              <p>
                Founded in Dutse in 2017, Startup Jigawa Ltd (RC 7256149) began as a grassroots technology hub. Over the past nine years, we have grown into a reliable centre for digital skills training, civic technology development, and community-focused research across Northern Nigeria.
              </p>
              <p>
                We focus on practical outcomes. Rather than offering one-off workshops, we help young people build marketable skills, work with local entrepreneurs to digitise their businesses, and collaborate with government agencies to improve public service delivery.
              </p>
              <p>
                To date, we have trained more than 50,000 participants, co-delivered major federal and state programmes, and built long-standing partnerships with development institutions.
              </p>
            </div>

            {/* Corporate Fact Sheet */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-subtle space-y-4">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-3">
                Organisation Details
              </h3>
              <dl className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <dt className="text-slate-500 font-medium">Registered Entity</dt>
                  <dd className="font-semibold text-slate-800">{siteConfig.legalName}</dd>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <dt className="text-slate-500 font-medium">Registration Number</dt>
                  <dd className="font-mono font-bold text-[#265728]">RC {siteConfig.rcNumber}</dd>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <dt className="text-slate-500 font-medium">Operating Since</dt>
                  <dd className="font-semibold text-slate-800">2017 (9 Years in Dutse)</dd>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <dt className="text-slate-500 font-medium">Headquarters</dt>
                  <dd className="font-semibold text-slate-800 text-right max-w-[200px]">
                    {siteConfig.contact.address}
                  </dd>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <dt className="text-slate-500 font-medium">Focus Areas</dt>
                  <dd className="font-semibold text-slate-800 text-right max-w-[200px]">
                    Digital Skills, Civic Tech, Local Tools &amp; Research
                  </dd>
                </div>
                <div className="flex justify-between py-1">
                  <dt className="text-slate-500 font-medium">Verified Reach</dt>
                  <dd className="font-bold text-[#265728]">50,000+ Participants</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team & Leadership Section (Card sample from user) */}
      <section id="team" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#265728] bg-[#eaf4eb] px-3 py-1 rounded-full">
              Leadership &amp; Advisors
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900">
              Meet Our Team
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Our leadership and advisory team bring years of experience in vocational training, software development, community programmes, and public policy.
            </p>
          </div>

          {teamMembers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-slate-500 text-sm bg-white rounded-xl border border-dashed border-slate-200">
              No team profiles published yet.
            </div>
          )}
        </div>
      </section>

      {/* Vision & Mission */}
      <section id="vision" className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-subtle">
              <span className="text-xs font-bold uppercase tracking-wider text-[#265728] bg-[#eaf4eb] px-3 py-1 rounded-full">
                Vision
              </span>
              <h3 className="mt-4 text-xl font-bold text-slate-900">
                The Future We Want to Build
              </h3>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                A Jigawa where every young person has access to practical digital skills, local businesses use technology to grow, and communities actively participate in decisions that affect them.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-subtle">
              <span className="text-xs font-bold uppercase tracking-wider text-[#c28829] bg-amber-50 px-3 py-1 rounded-full">
                Mission
              </span>
              <h3 className="mt-4 text-xl font-bold text-slate-900">
                What We Do Every Day
              </h3>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                We equip people with practical digital skills, build technology tools for everyday challenges, and work with public and private institutions to create real economic opportunities in Jigawa State.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#265728] bg-[#eaf4eb] px-3 py-1 rounded-full">
              Our Principles
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-slate-900">
              The Values That Guide Our Work
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              These commitments shape how we work with students, partners, and communities across Jigawa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {values.map((val) => (
              <div
                key={val.title}
                className="p-5 rounded-xl border border-slate-200 bg-white hover:border-[#265728]/40 hover:shadow-card-hover transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-[#eaf4eb] text-[#265728] font-bold flex items-center justify-center text-sm mb-3">
                  ✓
                </div>
                <h4 className="text-base font-bold text-slate-900">{val.title}</h4>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance & Leadership Units */}
      <section id="governance" className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#265728] bg-[#eaf4eb] px-3 py-1 rounded-full">
              How We Work
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-slate-900">
              Our Delivery Units
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Our team operates across three main focus areas to deliver our programmes efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 shadow-subtle">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Executive Leadership
              </div>
              <h4 className="text-base font-bold text-slate-900 mt-1">
                Executive Management
              </h4>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Oversees organisational strategy, financial accountability, and partnerships with government and development institutions.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 shadow-subtle">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Training &amp; Academy
              </div>
              <h4 className="text-base font-bold text-slate-900 mt-1">
                Digital Skills Academy
              </h4>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Manages our curriculum, course delivery, mentors, and national training initiatives such as 3MTT and NJFP.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 shadow-subtle">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Research &amp; Civic Technology
              </div>
              <h4 className="text-base font-bold text-slate-900 mt-1">
                Civic Tech &amp; Research Lab
              </h4>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Builds community data tools, conducts field research across local government areas, and works with the Open Government Partnership.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
