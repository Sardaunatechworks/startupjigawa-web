"use client";

import React, { useState } from "react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { Badge } from "@/components/ui/Badge";
import { Mail, CheckCircle2, Clock, Trash2, Reply, Search } from "lucide-react";

interface AdminInquiriesPageProps {
  onOpenMobileMenu?: () => void;
}

export default function AdminInquiriesPage({
  onOpenMobileMenu,
}: AdminInquiriesPageProps) {
  const [filterType, setFilterType] = useState("ALL");
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);

  const [inquiries, setInquiries] = useState<any[]>([]);

  React.useEffect(() => {
    async function loadInquiries() {
      try {
        const res = await fetch("/api/cms/inquiries");
        const json = await res.json();
        if (json.success && json.data) {
          setInquiries(json.data);
        }
      } catch (err) {
        console.error("Failed to load inquiries:", err);
      }
    }
    loadInquiries();
  }, []);

  const syncInquiriesToServer = async (newInquiries: any[]) => {
    try {
      await fetch("/api/cms/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inquiries: newInquiries }),
      });
    } catch (err) {
      console.error("Failed to sync inquiries:", err);
    }
  };

  const handleToggleStatus = async (id: string) => {
    const updated = inquiries.map((inq) => {
      if (inq.id !== id) return inq;
      return {
        ...inq,
        status: inq.status === "NEW" ? "REPLIED" : "NEW",
      };
    });
    setInquiries(updated);
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry((prev: any) => ({
        ...prev,
        status: prev.status === "NEW" ? "REPLIED" : "NEW",
      }));
    }
    await syncInquiriesToServer(updated);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this inquiry from inbox?")) {
      const updated = inquiries.filter((inq) => inq.id !== id);
      setInquiries(updated);
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry(null);
      }
      await syncInquiriesToServer(updated);
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    if (filterType === "ALL") return true;
    if (filterType === "NEW") return inq.status === "NEW";
    if (filterType === "REPLIED") return inq.status === "REPLIED";
    return inq.type === filterType;
  });

  return (
    <>
      <AdminTopbar
        title="Inquiries &amp; Messages"
        subtitle="Public submissions from contact and partnership consultation desks"
        onOpenMobileMenu={onOpenMobileMenu}
      />

      <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-2 bg-white p-3 rounded-2xl border border-slate-200/90 shadow-2xs">
          {["ALL", "NEW", "REPLIED", "PARTNERSHIP", "PROGRAM", "GENERAL"].map(
            (type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                  filterType === type
                    ? "bg-[#265728] text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {type}
              </button>
            )
          )}
        </div>

        {/* 2-Column Split: Message List on Left, Detail Viewer on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs divide-y divide-slate-100">
            {filteredInquiries.length > 0 ? (
              filteredInquiries.map((inq) => (
                <div
                  key={inq.id}
                  onClick={() => setSelectedInquiry(inq)}
                  className={`p-4 cursor-pointer transition-all hover:bg-slate-50 ${
                    selectedInquiry?.id === inq.id
                      ? "bg-emerald-50/50 border-l-4 border-l-[#265728]"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {inq.sender}
                    </span>
                    <Badge variant={inq.status === "NEW" ? "brand" : "neutral"}>
                      {inq.status}
                    </Badge>
                  </div>
                  <div className="text-xs font-semibold text-slate-700 line-clamp-1">
                    {inq.subject}
                  </div>
                  <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    {inq.org}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-2 flex items-center justify-between">
                    <span>{inq.type}</span>
                    <span>{inq.date}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-slate-500">
                No inquiries received yet. Submissions through the contact and partnership desks will appear here.
              </div>
            )}
          </div>

          {/* Right Message Viewer */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs">
            {selectedInquiry ? (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="flex items-start justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {selectedInquiry.subject}
                    </h3>
                    <div className="text-xs text-slate-600 mt-1">
                      From:{" "}
                      <span className="font-bold text-slate-800">
                        {selectedInquiry.sender}
                      </span>{" "}
                      &middot; {selectedInquiry.org}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Email:{" "}
                      <a
                        href={`mailto:${selectedInquiry.email}`}
                        className="text-[#265728] underline font-medium"
                      >
                        {selectedInquiry.email}
                      </a>{" "}
                      &middot; Tel: {selectedInquiry.phone}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(selectedInquiry.id)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold hover:bg-slate-50"
                    >
                      Mark as {selectedInquiry.status === "NEW" ? "Replied" : "New"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(selectedInquiry.id)}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Message Content
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 whitespace-pre-line">
                    {selectedInquiry.message}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400">
                    Category: {selectedInquiry.type} &middot; Received:{" "}
                    {selectedInquiry.date}
                  </span>
                  <a
                    href={`mailto:${selectedInquiry.email}?subject=RE: ${selectedInquiry.subject}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#265728] text-white font-bold hover:bg-[#1b411d] transition-colors"
                  >
                    <Reply className="w-4 h-4" />
                    <span>Reply via Email</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-slate-400 space-y-2">
                <Mail className="w-10 h-10 mx-auto text-slate-300" />
                <h4 className="text-sm font-semibold text-slate-700">
                  Select a message to read details
                </h4>
                <p className="text-xs text-slate-400">
                  Click any inquiry on the left to view the full message body, sender information, and reply directly.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
