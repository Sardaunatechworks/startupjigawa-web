"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import {
  GraduationCap,
  Briefcase,
  Mail,
  Users,
  Handshake,
  Settings,
  ChevronRight,
  Inbox,
  ArrowRight,
} from "lucide-react";
import { Program } from "@/types";

interface AdminDashboardPageProps {
  onOpenMobileMenu?: () => void;
}

interface InquiryItem {
  id: string;
  sender: string;
  org?: string;
  email: string;
  type: string;
  subject: string;
  date: string;
  status: "NEW" | "REPLIED";
}

export default function AdminDashboardPage({
  onOpenMobileMenu,
}: AdminDashboardPageProps) {
  // Real data state - no hardcoded mock inquiries
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [programsRes, inqRes] = await Promise.all([
          fetch("/api/cms/programs"),
          fetch("/api/cms/inquiries"),
        ]);

        const programsJson = await programsRes.json();
        if (programsJson.success && programsJson.data) {
          setPrograms(programsJson.data);
        }

        const inqJson = await inqRes.json();
        if (inqJson.success && inqJson.data) {
          setInquiries(inqJson.data);
        }
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const unreadCount = inquiries.filter((inq) => inq.status === "NEW").length;
  const activeProgramsCount = programs.filter((p) => p.status === "OPEN" || p.status === "ONGOING").length;

  return (
    <>
      <AdminTopbar
        title="Dashboard"
        subtitle="Startup Jigawa · Overview"
        onOpenMobileMenu={onOpenMobileMenu}
        actionButton={{
          label: "Add Programme",
          href: "/admin/programs",
        }}
      />

      <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
        {/* Minimal Metric Cards */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-white border border-slate-200">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Total Trained
              </span>
              <GraduationCap className="w-4 h-4 text-[#265728]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900">
              50,000+
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Official verified track record
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Active Programmes
              </span>
              <Briefcase className="w-4 h-4 text-[#265728]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900">
              {activeProgramsCount > 0 ? activeProgramsCount : programs.length}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Published training cohorts
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                New Inquiries
              </span>
              <Mail className="w-4 h-4 text-[#265728]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900">
              {unreadCount}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {unreadCount === 0 ? "Inbox is up to date" : `${unreadCount} unread`}
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Partners &amp; MOUs
              </span>
              <Handshake className="w-4 h-4 text-[#265728]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900">
              7
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Government &amp; multilateral partners
            </div>
          </div>
        </section>

        {/* Minimal Navigation Modules */}
        <section className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
            Quick Actions
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { name: "Programmes", href: "/admin/programs", icon: GraduationCap },
              { name: "Opportunities", href: "/admin/opportunities", icon: Briefcase },
              { name: "Inquiries", href: "/admin/inquiries", icon: Mail },
              { name: "Team Members", href: "/admin/team", icon: Users },
              { name: "Partners", href: "/admin/partners", icon: Handshake },
              { name: "Settings", href: "/admin/settings", icon: Settings },
            ].map((module) => (
              <Link
                key={module.name}
                href={module.href}
                className="flex items-center gap-2.5 p-3 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-[#265728] transition-all group"
              >
                <module.icon className="w-4 h-4 text-slate-600 group-hover:text-[#265728] transition-colors" />
                <span className="text-xs font-semibold text-slate-800 group-hover:text-[#265728] transition-colors">
                  {module.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* 2-Column Minimal Split: Recent Inquiries & Active Programmes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Recent Inquiries Inbox (Left 7 cols) */}
          <section className="lg:col-span-7 bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Recent Inquiries
                </h2>
                <p className="text-xs text-slate-500">
                  Messages submitted through the public contact form
                </p>
              </div>
              <Link
                href="/admin/inquiries"
                className="text-xs font-semibold text-[#265728] hover:underline flex items-center gap-1"
              >
                <span>View Inbox</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {inquiries.length === 0 ? (
              <div className="p-8 text-center flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                  <Inbox className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-bold text-slate-700">No New Inquiries</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm">
                  Submissions through the public contact and partnership forms will appear here in real time.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    <tr>
                      <th className="py-2.5 px-4">Sender</th>
                      <th className="py-2.5 px-4">Subject</th>
                      <th className="py-2.5 px-4">Category</th>
                      <th className="py-2.5 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {inquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-semibold text-slate-900">{inq.sender}</div>
                          {inq.org && <div className="text-[11px] text-slate-500">{inq.org}</div>}
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-medium text-slate-800 line-clamp-1">{inq.subject}</div>
                          <div className="text-[10px] text-slate-400">{inq.date}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                            {inq.type}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                              inq.status === "NEW"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {inq.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* Active Programmes (Right 5 cols) */}
          <section className="lg:col-span-5 bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Published Programmes
                </h2>
                <p className="text-xs text-slate-500">
                  Official programmes and academies
                </p>
              </div>
              <Link
                href="/admin/programs"
                className="text-xs font-semibold text-[#265728] hover:underline flex items-center gap-1"
              >
                <span>Manage</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-4 divide-y divide-slate-100">
              {isLoading ? (
                <div className="text-xs text-slate-400 py-4 text-center">Loading programmes...</div>
              ) : programs.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-500">
                  No published programmes found. Click &quot;Add Programme&quot; to publish a new cohort.
                </div>
              ) : (
                programs.slice(0, 4).map((prog) => (
                  <div
                    key={prog.id}
                    className="py-3 first:pt-0 last:pb-0 flex items-start justify-between gap-3"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900 line-clamp-1">
                        {prog.title}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {prog.category}
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shrink-0 ${
                        prog.status === "OPEN"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : prog.status === "ONGOING"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {prog.status}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
              <Link
                href="/admin/programs"
                className="text-xs font-semibold text-[#265728] hover:underline inline-flex items-center gap-1"
              >
                <span>Open Full Programme Manager</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
