"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Opportunity, OpportunityType, OpportunityStatus } from "@/types";
import { ImageUpload } from "@/components/ui/ImageUpload";

const INITIAL_OPPORTUNITIES: Opportunity[] = [
  {
    id: "opp-1",
    title: "Software Engineering & Cloud Bootcamp 2026",
    slug: "software-engineering-bootcamp-2026",
    summary:
      "12-week intensive hands-on software development training covering full-stack web development, relational databases, and cloud deployment in Dutse.",
    type: "BOOTCAMP",
    status: "OPEN",
    deadline: "2026-11-15",
    startDate: "2026-12-01",
    location: "Dutse Digital Hub, Jigawa State",
    applicationUrl: "https://forms.gle/startupjigawa-dev-2026",
    featured: true,
    eligibility: "Residents of Jigawa State aged 18-35 with basic computer literacy.",
  },
  {
    id: "opp-2",
    title: "Civic Tech & Open Governance Fellowship",
    slug: "civic-tech-fellowship-2026",
    summary:
      "6-month paid fellowship working with local communities and civil society organisations across Jigawa to design civic engagement and budget monitoring tools.",
    type: "FELLOWSHIP",
    status: "OPEN",
    deadline: "2026-11-30",
    startDate: "2027-01-10",
    location: "Hybrid (Dutse + Field LGA Work)",
    applicationUrl: "https://forms.gle/startupjigawa-civic-fellowship",
    featured: true,
    eligibility: "Researchers, policy advocates, and software designers in Northern Nigeria.",
  },
  {
    id: "opp-3",
    title: "Data Analysis & AI Readiness Internship",
    slug: "data-analysis-ai-readiness-2026",
    summary:
      "Practical 16-week placement for university graduates and HND holders to build real data pipelines and analytics dashboards for agriculture and healthcare.",
    type: "INTERNSHIP",
    status: "UPCOMING",
    deadline: "2026-12-15",
    startDate: "2027-02-01",
    location: "Dutse Innovation Center",
    applicationUrl: "https://forms.gle/startupjigawa-data-internship",
    featured: false,
    eligibility: "Recent graduates (2023-2026) with backgrounds in STEM or statistics.",
  },
  {
    id: "opp-4",
    title: "Northern Agri-Tech Innovation Challenge",
    slug: "northern-agri-tech-challenge",
    summary:
      "Competitive innovation grant and acceleration programme for digital solutions addressing crop yield, irrigation, or market access in rural Jigawa.",
    type: "COMPETITION",
    status: "CLOSED",
    deadline: "2026-09-30",
    startDate: "2026-10-15",
    location: "Dutse & Hadejia Zones",
    applicationUrl: null,
    featured: false,
    eligibility: "Early-stage entrepreneurs and developer teams from Jigawa State.",
  },
];

export default function AdminOpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(INITIAL_OPPORTUNITIES);
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Real-time fetch from CMS store
  React.useEffect(() => {
    async function loadOpportunities() {
      try {
        const res = await fetch("/api/cms/opportunities");
        const json = await res.json();
        if (json.success && json.data && json.data.length > 0) {
          setOpportunities(json.data);
        }
      } catch (err) {
        console.error("Failed to load opportunities:", err);
      }
    }
    loadOpportunities();
  }, []);

  const syncOpportunitiesToServer = async (newOpps: Opportunity[]) => {
    setIsSaving(true);
    try {
      await fetch("/api/cms/opportunities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ opportunities: newOpps }),
      });
    } catch (err) {
      console.error("Failed to sync opportunities to live website:", err);
    } finally {
      setIsSaving(false);
    }
  };

  // New opportunity form state
  const [formTitle, setFormTitle] = useState("");
  const [formType, setFormType] = useState<OpportunityType>("BOOTCAMP");
  const [formDeadline, setFormDeadline] = useState("");
  const [formLocation, setFormLocation] = useState("Dutse, Jigawa State");
  const [formSummary, setFormSummary] = useState("");
  const [formUrl, setFormUrl] = useState("");
  const [formImage, setFormImage] = useState("");

  const filteredOpportunities = opportunities.filter((item) => {
    const matchesType = selectedType === "ALL" || item.type === selectedType;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const toggleStatus = async (id: string) => {
    const updated = opportunities.map((item) => {
      if (item.id === id) {
        const nextStatus: Record<OpportunityStatus, OpportunityStatus> = {
          OPEN: "CLOSED",
          CLOSED: "UPCOMING",
          UPCOMING: "OPEN",
          DRAFT: "OPEN",
          ARCHIVED: "DRAFT",
        };
        return { ...item, status: nextStatus[item.status] || "OPEN" };
      }
      return item;
    });
    setOpportunities(updated);
    await syncOpportunitiesToServer(updated);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const newOpp: Opportunity = {
      id: `opp-${Date.now()}`,
      title: formTitle.trim(),
      slug: formTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      summary: formSummary.trim() || "Applications are now open for this programme in Jigawa.",
      type: formType,
      status: "OPEN",
      deadline: formDeadline || "2026-12-31",
      location: formLocation,
      applicationUrl: formUrl || "https://forms.gle/startupjigawa",
      featured: false,
    };

    const updated = [newOpp, ...opportunities];
    setOpportunities(updated);
    setFormTitle("");
    setFormSummary("");
    setFormUrl("");
    setFormImage("");
    setIsModalOpen(false);
    await syncOpportunitiesToServer(updated);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to remove this opportunity notice?")) {
      const updated = opportunities.filter((o) => o.id !== id);
      setOpportunities(updated);
      await syncOpportunitiesToServer(updated);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Opportunities &amp; Calls</h1>
          <p className="text-sm text-slate-600 mt-1">
            Publish and manage open bootcamps, fellowships, internships, and grant applications.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/opportunities"
            target="_blank"
            className="px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Public View &rarr;
          </Link>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-lg bg-[#265728] hover:bg-[#1b411d] text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Add Opportunity
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="w-full md:w-80">
          <input
            type="text"
            placeholder="Search opportunities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#265728] focus:ring-1 focus:ring-[#265728]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {["ALL", "BOOTCAMP", "FELLOWSHIP", "INTERNSHIP", "COMPETITION"].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                selectedType === type
                  ? "bg-[#265728] text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Opportunities List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredOpportunities.map((opp) => (
          <div
            key={opp.id}
            className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                  {opp.type}
                </span>

                <button
                  onClick={() => toggleStatus(opp.id)}
                  title="Click to cycle status"
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
                    opp.status === "OPEN"
                      ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                      : opp.status === "UPCOMING"
                      ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                      : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                  }`}
                >
                  ● {opp.status}
                </button>
              </div>

              <h3 className="text-base font-bold text-slate-900 mt-2.5 leading-snug">
                {opp.title}
              </h3>
              <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                {opp.summary}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-500">
                <div>
                  <span className="font-semibold text-slate-700">Deadline:</span> {opp.deadline}
                </div>
                <div>
                  <span className="font-semibold text-slate-700">Location:</span> {opp.location}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              {opp.applicationUrl ? (
                <a
                  href={opp.applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#265728] hover:underline flex items-center gap-1"
                >
                  Application Form &rarr;
                </a>
              ) : (
                <span className="text-xs text-slate-400 italic">No external link</span>
              )}

              <button
                onClick={() => handleDelete(opp.id)}
                className="text-xs font-bold text-rose-600 hover:text-rose-800"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-900">Add New Opportunity</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="mt-4 space-y-4">
              <div>
                <ImageUpload
                  label="Opportunity Poster / Flyer (Upload from Local Computer)"
                  folder="opportunities"
                  value={formImage}
                  onChange={setFormImage}
                  aspectRatio="landscape"
                  helperText="Upload an announcement flyer from your local computer (PNG, JPG, WEBP)"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2026 Northern Women in Tech Fellowship"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#265728]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Type
                  </label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as OpportunityType)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="BOOTCAMP">Bootcamp</option>
                    <option value="FELLOWSHIP">Fellowship</option>
                    <option value="INTERNSHIP">Internship</option>
                    <option value="TRAINING">Training</option>
                    <option value="COMPETITION">Competition / Grant</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Application Deadline
                  </label>
                  <input
                    type="date"
                    value={formDeadline}
                    onChange={(e) => setFormDeadline(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Location / Venue
                </label>
                <input
                  type="text"
                  value={formLocation}
                  onChange={(e) => setFormLocation(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Summary &amp; Objectives
                </label>
                <textarea
                  rows={3}
                  value={formSummary}
                  onChange={(e) => setFormSummary(e.target.value)}
                  placeholder="Provide a concise description of eligibility and what participants will gain..."
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Application Link (Google Forms / Portal)
                </label>
                <input
                  type="url"
                  placeholder="https://forms.gle/..."
                  value={formUrl}
                  onChange={(e) => setFormUrl(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-[#265728] text-white hover:bg-[#1b411d] rounded-lg shadow-sm"
                >
                  Publish Opportunity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
