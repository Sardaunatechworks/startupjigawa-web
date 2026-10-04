"use client";

import React, { useState } from "react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { Badge } from "@/components/ui/Badge";
import { Plus, Search, Filter, Trash2, Edit, Check } from "lucide-react";
import { ImageUpload } from "@/components/ui/ImageUpload";

type ProgramAdminStatus = "OPEN" | "ONGOING" | "CLOSED" | "UPCOMING";

interface ProgramItem {
  id: string;
  title: string;
  category: string;
  status: ProgramAdminStatus;
  enrolled: number;
  capacity: number;
  deadline: string;
}

const INITIAL_PROGRAMS: ProgramItem[] = [
  {
    id: "p1",
    title: "Digital Skills Academy - Software Engineering Diploma",
    category: "Digital Skills Academy",
    status: "OPEN",
    enrolled: 120,
    capacity: 150,
    deadline: "2026-11-30",
  },
  {
    id: "p2",
    title: "Three Million Technical Talent (3MTT) Jigawa Cohort",
    category: "National Initiative",
    status: "ONGOING",
    enrolled: 1500,
    capacity: 1500,
    deadline: "2026-12-31",
  },
  {
    id: "p3",
    title: "Civic Tech & Open Government Innovation Fellowship",
    category: "Civic Technology",
    status: "UPCOMING",
    enrolled: 25,
    capacity: 30,
    deadline: "2026-12-15",
  },
  {
    id: "p4",
    title: "AgriTech & Climate Resilience Innovation Sprint",
    category: "Innovation Lab",
    status: "OPEN",
    enrolled: 40,
    capacity: 50,
    deadline: "2026-12-10",
  },
];

interface AdminProgramsPageProps {
  onOpenMobileMenu?: () => void;
}

export default function AdminProgramsPage({
  onOpenMobileMenu,
}: AdminProgramsPageProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [showAddModal, setShowAddModal] = useState(false);

  const [programsList, setProgramsList] = useState<ProgramItem[]>(INITIAL_PROGRAMS);
  const [isSaving, setIsSaving] = useState(false);

  // Real-time fetch from CMS store
  React.useEffect(() => {
    async function loadPrograms() {
      try {
        const res = await fetch("/api/cms/programs");
        const json = await res.json();
        if (json.success && json.data && json.data.length > 0) {
          // Map to ProgramItem structure if needed
          const mapped: ProgramItem[] = json.data.map((p: any) => ({
            id: p.id,
            title: p.title,
            category: p.category,
            status: p.status || "OPEN",
            enrolled: p.enrolled || 0,
            capacity: p.capacity || 100,
            deadline: p.deadline || "Open Intake",
          }));
          setProgramsList(mapped);
        }
      } catch (err) {
        console.error("Failed to load programs:", err);
      }
    }
    loadPrograms();
  }, []);

  const syncProgramsToServer = async (newPrograms: ProgramItem[]) => {
    setIsSaving(true);
    try {
      await fetch("/api/cms/programs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ programs: newPrograms }),
      });
    } catch (err) {
      console.error("Failed to sync programs to live website:", err);
    } finally {
      setIsSaving(false);
    }
  };

  // New program form state
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Digital Skills Academy");
  const [newCapacity, setNewCapacity] = useState("100");
  const [newDeadline, setNewDeadline] = useState("2026-12-20");
  const [newCoverImage, setNewCoverImage] = useState("");

  const handleAddProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newProg: ProgramItem = {
      id: `prog-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      status: "OPEN",
      enrolled: 0,
      capacity: parseInt(newCapacity) || 100,
      deadline: newDeadline,
    };

    const updated = [newProg, ...programsList];
    setProgramsList(updated);
    setNewTitle("");
    setNewCoverImage("");
    setShowAddModal(false);
    await syncProgramsToServer(updated);
  };

  const handleToggleStatus = async (id: string) => {
    const updated = programsList.map((p) => {
      if (p.id !== id) return p;
      const nextStatus =
        p.status === "OPEN"
          ? ("ONGOING" as const)
          : p.status === "ONGOING"
          ? ("CLOSED" as const)
          : ("OPEN" as const);
      return { ...p, status: nextStatus };
    });
    setProgramsList(updated);
    await syncProgramsToServer(updated);
  };

  const handleDeleteProgram = async (id: string) => {
    if (confirm("Are you sure you want to remove this programme?")) {
      const updated = programsList.filter((p) => p.id !== id);
      setProgramsList(updated);
      await syncProgramsToServer(updated);
    }
  };

  const filteredPrograms = programsList.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesCat =
      selectedCategory === "ALL" || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <>
      <AdminTopbar
        title="Manage Programmes"
        subtitle="View, publish, and monitor training cohorts and admissions"
        onOpenMobileMenu={onOpenMobileMenu}
        actionButton={{
          label: "Add Programme",
          onClick: () => setShowAddModal(true),
        }}
      />

      <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by programme title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#265728]"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#265728]"
            >
              <option value="ALL">All Categories</option>
              <option value="Digital Skills Academy">Digital Skills Academy</option>
              <option value="National Initiative">National Initiative</option>
              <option value="Civic Technology">Civic Technology</option>
              <option value="Innovation Lab">Innovation Lab</option>
            </select>
          </div>
        </div>

        {/* Programmes Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600 min-w-[700px]">
              <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-5">Programme Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Admissions Status</th>
                  <th className="py-3 px-4">Enrolment</th>
                  <th className="py-3 px-4">Deadline</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPrograms.map((prog) => (
                  <tr
                    key={prog.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-3.5 px-5">
                      <div className="font-bold text-slate-900 leading-snug">
                        {prog.title}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        ID: {prog.id}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700">
                        {prog.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(prog.id)}
                        title="Click to cycle status"
                        className="cursor-pointer"
                      >
                        <Badge
                          variant={
                            prog.status === "OPEN"
                              ? "success"
                              : prog.status === "ONGOING"
                              ? "brand"
                              : "neutral"
                          }
                        >
                          {prog.status} (Click to change)
                        </Badge>
                      </button>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800">
                        {prog.enrolled} / {prog.capacity}
                      </div>
                      <div className="w-24 h-1.5 rounded-full bg-slate-100 overflow-hidden mt-1">
                        <div
                          className="h-full bg-[#265728]"
                          style={{
                            width: `${Math.min(
                              100,
                              Math.round((prog.enrolled / prog.capacity) * 100)
                            )}%`,
                          }}
                        />
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600">
                      {prog.deadline}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(prog.id)}
                          className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-emerald-700"
                          title="Toggle Status"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProgram(prog.id)}
                          className="p-1 rounded hover:bg-rose-50 text-slate-400 hover:text-rose-600"
                          title="Delete Programme"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: Add Programme */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
              <h3 className="text-lg font-bold text-slate-900">
                Add New Programme
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Create a training cohort or fellowship entry on Startup Jigawa
              </p>

              <form onSubmit={handleAddProgram} className="mt-5 space-y-4">
                <div>
                  <ImageUpload
                    label="Programme Cover Image (Upload from Local Computer)"
                    folder="programs"
                    value={newCoverImage}
                    onChange={setNewCoverImage}
                    aspectRatio="landscape"
                    helperText="Upload a banner photo from your local computer (PNG, JPG, WEBP)"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Programme Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Cybersecurity & Network Defence Academy"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#265728]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#265728]"
                  >
                    <option value="Digital Skills Academy">
                      Digital Skills Academy
                    </option>
                    <option value="National Initiative">National Initiative</option>
                    <option value="Civic Technology">Civic Technology</option>
                    <option value="Innovation Lab">Innovation Lab</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Target Capacity
                    </label>
                    <input
                      type="number"
                      value={newCapacity}
                      onChange={(e) => setNewCapacity(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#265728]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Application Deadline
                    </label>
                    <input
                      type="date"
                      value={newDeadline}
                      onChange={(e) => setNewDeadline(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#265728]"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg text-xs font-bold bg-[#265728] text-white hover:bg-[#1b411d]"
                  >
                    Publish Programme
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
