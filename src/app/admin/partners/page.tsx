"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Partner } from "@/types";
import { ImageUpload } from "@/components/ui/ImageUpload";

const INITIAL_PARTNERS: Partner[] = [
  {
    id: "prt-1",
    name: "Jigawa State Government & MDAs",
    slug: "jigawa-state-government",
    category: "State Government",
    publicRelationshipLabel: "Program Co-Delivery & Tech Advisory",
    websiteUrl: "https://jigawastate.gov.ng",
    publicVisibility: true,
    featured: true,
  },
  {
    id: "prt-2",
    name: "NITDA (National Information Technology Development Agency)",
    slug: "nitda",
    category: "Federal Government",
    publicRelationshipLabel: "National Digital Economy Partner",
    websiteUrl: "https://nitda.gov.ng",
    publicVisibility: true,
    featured: true,
  },
  {
    id: "prt-3",
    name: "Federal Ministry of Communications & Digital Economy",
    slug: "fmcide",
    category: "Federal Government",
    publicRelationshipLabel: "Skills & Innovation Alignment",
    websiteUrl: "https://fmcide.gov.ng",
    publicVisibility: true,
    featured: true,
  },
  {
    id: "prt-4",
    name: "JICA (Japan International Cooperation Agency)",
    slug: "jica",
    category: "Development Partner",
    publicRelationshipLabel: "Development Technology Collaboration",
    websiteUrl: "https://www.jica.go.jp/english/",
    publicVisibility: true,
    featured: true,
  },
  {
    id: "prt-5",
    name: "Open Government Partnership (OGP) Jigawa",
    slug: "ogp-jigawa",
    category: "Civil Society & Governance",
    publicRelationshipLabel: "Transparency & Civic Tech Partner",
    websiteUrl: "https://ogpnigeria.gov.ng",
    publicVisibility: true,
    featured: true,
  },
  {
    id: "prt-6",
    name: "3MTT (Three Million Technical Talent)",
    slug: "3mtt",
    category: "National Initiative",
    publicRelationshipLabel: "In-State Delivery Partner",
    websiteUrl: "https://3mtt.nitda.gov.ng",
    publicVisibility: true,
    featured: true,
  },
  {
    id: "prt-7",
    name: "Nigeria Jubilee Fellows Programme (NJFP)",
    slug: "njfp",
    category: "National Initiative",
    publicRelationshipLabel: "Graduate Work-Readiness Partner",
    websiteUrl: "https://www.njfp.ng",
    publicVisibility: true,
    featured: true,
  },
];

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<Partner[]>(INITIAL_PARTNERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // New partner state
  const [name, setName] = useState("");
  const [category, setCategory] = useState("State Government");
  const [relationship, setRelationship] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [logoUrl, setLogoUrl] = useState("");

  // Real-time fetch from CMS store
  React.useEffect(() => {
    async function loadPartners() {
      try {
        const res = await fetch("/api/cms/partners");
        const json = await res.json();
        if (json.success && json.data) {
          setPartners(json.data);
        }
      } catch (err) {
        console.error("Failed to load partners:", err);
      }
    }
    loadPartners();
  }, []);

  const syncPartnersToServer = async (newPartners: Partner[]) => {
    setIsSaving(true);
    try {
      await fetch("/api/cms/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ partners: newPartners }),
      });
    } catch (err) {
      console.error("Failed to sync partners to live website:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const filteredPartners = partners.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.publicRelationshipLabel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleVisibility = async (id: string) => {
    const updated = partners.map((p) =>
      p.id === id ? { ...p, publicVisibility: !p.publicVisibility } : p
    );
    setPartners(updated);
    await syncPartnersToServer(updated);
  };

  const handleAddPartner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newPartner: Partner = {
      id: `prt-${Date.now()}`,
      name: name.trim(),
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category,
      publicRelationshipLabel: relationship.trim() || "Strategic Partner",
      websiteUrl: websiteUrl.trim() || null,
      logoUrl: logoUrl.trim() || null,
      publicVisibility: true,
      featured: true,
    };

    const updated = [...partners, newPartner];
    setPartners(updated);
    setName("");
    setRelationship("");
    setWebsiteUrl("");
    setLogoUrl("");
    setIsModalOpen(false);
    await syncPartnersToServer(updated);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Remove this partner organisation from the directory?")) {
      const updated = partners.filter((p) => p.id !== id);
      setPartners(updated);
      await syncPartnersToServer(updated);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Partners &amp; Collaborators</h1>
          <p className="text-sm text-slate-600 mt-1">
            Manage institutional relationships, ministries, development agencies, and their public visibility.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/partners"
            target="_blank"
            className="px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Public Partners Page &rarr;
          </Link>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-lg bg-[#265728] hover:bg-[#1b411d] text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Add Partner
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
        <input
          type="text"
          placeholder="Filter partners by name, tier, or initiative..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#265728]"
        />
        <span className="text-xs font-mono text-slate-400">
          Showing {filteredPartners.length} of {partners.length}
        </span>
      </div>

      {/* Partners Table */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[10px] font-black tracking-wider">
                <th className="py-3.5 px-4">Partner Name</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Relationship / Mandate</th>
                <th className="py-3.5 px-4">Website</th>
                <th className="py-3.5 px-4 text-center">Visibility</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPartners.map((partner) => (
                <tr key={partner.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      {partner.logoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={partner.logoUrl}
                          alt={partner.name}
                          className="w-9 h-9 object-contain rounded-lg p-1 bg-slate-50 border border-slate-200 shrink-0"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-lg bg-emerald-50 text-[#265728] font-bold text-xs flex items-center justify-center border border-emerald-200 shrink-0">
                          {partner.name.substring(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-slate-900">{partner.name}</div>
                        <div className="text-[10px] font-mono text-slate-400">{partner.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-md font-semibold text-[10px] bg-slate-100 text-slate-700">
                      {partner.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">
                    {partner.publicRelationshipLabel}
                  </td>
                  <td className="py-3.5 px-4">
                    {partner.websiteUrl ? (
                      <a
                        href={partner.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#265728] hover:underline font-medium"
                      >
                        Visit site ↗
                      </a>
                    ) : (
                      <span className="text-slate-400 italic">None</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => toggleVisibility(partner.id)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-colors ${
                        partner.publicVisibility
                          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                          : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                      }`}
                    >
                      {partner.publicVisibility ? "Visible" : "Hidden"}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleDelete(partner.id)}
                      className="text-rose-600 hover:text-rose-800 font-bold"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Partner Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-900">Add Institutional Partner</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddPartner} className="mt-4 space-y-4">
              <div>
                <ImageUpload
                  label="Partner Logo (Upload from Local Computer)"
                  folder="partners"
                  value={logoUrl}
                  onChange={setLogoUrl}
                  helperText="SVG, PNG, or JPG logo from your local computer"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Institution Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bank of Industry (BOI)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#265728]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Partner Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                >
                  <option value="State Government">State Government</option>
                  <option value="Federal Government">Federal Government</option>
                  <option value="Development Partner">Development Partner</option>
                  <option value="Civil Society & Governance">Civil Society &amp; Governance</option>
                  <option value="National Initiative">National Initiative</option>
                  <option value="Academic Institution">Academic Institution</option>
                  <option value="Private Sector">Private Sector</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Relationship Label / Co-Delivery Scope
                </label>
                <input
                  type="text"
                  placeholder="e.g. Seed Capital & Acceleration Partner"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Website URL
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
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
                  Add Partner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
