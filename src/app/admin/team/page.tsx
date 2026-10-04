"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TeamMember } from "@/types";
import { ImageUpload } from "@/components/ui/ImageUpload";

const INITIAL_TEAM: TeamMember[] = [
  {
    id: "tm-1",
    name: "Dr. Abdullahi Shehu",
    role: "Technical Advisor, Vocational Training & Innovation",
    initial: "S",
    department: "Advisory & Strategy",
    bio: "Dr. Abdullahi Shehu advises Startup Jigawa on vocational education and practical skills training. He provides guidance on our training curriculum, technical standards, and partnerships with educational and development institutions in Northern Nigeria.",
    displayOrder: 1,
  },
  {
    id: "tm-2",
    name: "Ibrahim Mohammed",
    role: "Founder & Chief Executive Officer",
    initial: "I",
    department: "Executive Leadership",
    bio: "Ibrahim founded Startup Jigawa in Dutse in 2017. He guides the organisation's strategy, partnerships with government agencies and development partners, and overall operations under CAC RC 7256149.",
    displayOrder: 2,
  },
  {
    id: "tm-3",
    name: "Amina Aliyu Sani",
    role: "Director of Programs & Digital Skills Academy",
    initial: "A",
    department: "Programs Directorate",
    bio: "Amina leads our Digital Skills Academy and manages student admissions. She has coordinated training delivery for major state and national initiatives, including 3MTT and the Nigeria Jubilee Fellows Programme across Jigawa.",
    displayOrder: 3,
  },
  {
    id: "tm-4",
    name: "Usman Farouk",
    role: "Head of Technology & Product Innovation",
    initial: "U",
    department: "Technology & Engineering",
    bio: "Usman leads software development and technology projects at Startup Jigawa. He directs our engineering team in building practical digital tools—such as RentHouse, SoftDeliver, PrepAI, and Yankasuwa—designed for local users and low-connectivity environments.",
    displayOrder: 4,
  },
  {
    id: "tm-5",
    name: "Fatima Bello Garba",
    role: "Lead, Civic Technology & Research Lab",
    initial: "F",
    department: "Civic Tech & Applied Research",
    bio: "Fatima manages our civic technology projects and field research across Jigawa's 27 Local Government Areas. She coordinates community surveys, research publications, and our ongoing collaboration with the Open Government Partnership (OGP) in Jigawa.",
    displayOrder: 5,
  },
];

export default function AdminTeamPage() {
  const [team, setTeam] = useState<TeamMember[]>(INITIAL_TEAM);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formName, setFormName] = useState("");
  const [formRole, setFormRole] = useState("");
  const [formDepartment, setFormDepartment] = useState("Executive Leadership");
  const [formBio, setFormBio] = useState("");
  const [formOrder, setFormOrder] = useState<number>(6);
  const [formPic, setFormPic] = useState<string>("");

  // Real-time fetch from CMS store
  React.useEffect(() => {
    async function loadTeam() {
      try {
        const res = await fetch("/api/cms/team");
        const json = await res.json();
        if (json.success && json.data) {
          setTeam(json.data);
        }
      } catch (err) {
        console.error("Failed to load team:", err);
      }
    }
    loadTeam();
  }, []);

  const syncTeamToServer = async (newTeam: TeamMember[]) => {
    setIsSaving(true);
    try {
      await fetch("/api/cms/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ team: newTeam }),
      });
    } catch (err) {
      console.error("Failed to sync team to live website:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const openNewModal = () => {
    setEditingMember(null);
    setFormName("");
    setFormRole("");
    setFormDepartment("Executive Leadership");
    setFormBio("");
    setFormPic("");
    setFormOrder(team.length + 1);
    setIsModalOpen(true);
  };

  const openEditModal = (member: TeamMember) => {
    setEditingMember(member);
    setFormName(member.name);
    setFormRole(member.role);
    setFormDepartment(member.department || "Executive Leadership");
    setFormBio(member.bio);
    setFormPic(member.profilePic || "");
    setFormOrder(member.displayOrder);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formRole.trim()) return;

    let updatedTeam: TeamMember[];

    if (editingMember) {
      updatedTeam = team.map((item) =>
        item.id === editingMember.id
          ? {
              ...item,
              name: formName.trim(),
              role: formRole.trim(),
              department: formDepartment,
              bio: formBio.trim(),
              profilePic: formPic || null,
              displayOrder: formOrder,
              initial: formName.trim().charAt(0).toUpperCase(),
            }
          : item
      );
    } else {
      const newMember: TeamMember = {
        id: `tm-${Date.now()}`,
        name: formName.trim(),
        role: formRole.trim(),
        department: formDepartment,
        bio: formBio.trim(),
        profilePic: formPic || null,
        initial: formName.trim().charAt(0).toUpperCase(),
        displayOrder: formOrder,
      };
      updatedTeam = [...team, newMember];
    }

    setTeam(updatedTeam);
    setIsModalOpen(false);
    await syncTeamToServer(updatedTeam);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Remove this team profile from the organisation directory?")) {
      const updatedTeam = team.filter((m) => m.id !== id);
      setTeam(updatedTeam);
      await syncTeamToServer(updatedTeam);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Team &amp; Leadership</h1>
          <p className="text-sm text-slate-600 mt-1">
            Manage public team profiles, advisors, and executive biographies displayed on the Meet Our Team section.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/about"
            target="_blank"
            className="px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            View on About Page &rarr;
          </Link>
          <button
            onClick={openNewModal}
            className="px-4 py-2 rounded-lg bg-[#265728] hover:bg-[#1b411d] text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Add Team Member
          </button>
        </div>
      </div>

      {/* Grid of Team Members */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {team
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((member) => (
            <div
              key={member.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {member.profilePic ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={member.profilePic}
                        alt={member.name}
                        className="w-12 h-12 rounded-xl object-cover shadow-xs border border-slate-200"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-[#265728] text-white flex items-center justify-center font-black text-lg shadow-xs">
                        {member.initial || member.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h3 className="text-base font-bold text-slate-900 leading-tight">
                        {member.name}
                      </h3>
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-0.5">
                        {member.department || "Leadership"}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">#{member.displayOrder}</span>
                </div>

                <div className="mt-3 text-xs font-semibold text-slate-700">
                  {member.role}
                </div>

                <p className="mt-2 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {member.bio}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => openEditModal(member)}
                  className="text-xs font-bold text-[#265728] hover:underline"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => handleDelete(member.id)}
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
              <h2 className="text-lg font-bold text-slate-900">
                {editingMember ? "Edit Team Profile" : "Add New Team Profile"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-4 space-y-4">
              <div>
                <ImageUpload
                  label="Profile Photo (Upload from Local Computer)"
                  folder="team"
                  value={formPic}
                  onChange={setFormPic}
                  shape="circle"
                  helperText="Choose a photo from your local computer (PNG, JPG, WEBP)"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ibrahim Mohammed"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#265728]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Official Role / Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Founder & Chief Executive Officer"
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#265728]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Department
                  </label>
                  <select
                    value={formDepartment}
                    onChange={(e) => setFormDepartment(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="Executive Leadership">Executive Leadership</option>
                    <option value="Advisory & Strategy">Advisory & Strategy</option>
                    <option value="Programs Directorate">Programs Directorate</option>
                    <option value="Technology & Engineering">Technology & Engineering</option>
                    <option value="Civic Tech & Applied Research">Civic Tech & Applied Research</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formOrder}
                    onChange={(e) => setFormOrder(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Professional Biography
                </label>
                <textarea
                  rows={4}
                  required
                  value={formBio}
                  onChange={(e) => setFormBio(e.target.value)}
                  placeholder="Outline their institutional background, contributions to Jigawa's digital ecosystem, and current responsibilities..."
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#265728]"
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
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
