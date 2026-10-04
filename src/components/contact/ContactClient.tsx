"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";

interface ContactClientProps {
  initialSettings?: {
    address?: string;
    phone?: string;
    email?: string;
    rcNumber?: string;
    operatingHours?: string;
  } | null;
}

export function ContactClient({ initialSettings }: ContactClientProps) {
  const [formType, setFormType] = useState<string>("GENERAL");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const contactSettings = {
    address: initialSettings?.address || siteConfig.contact.address,
    phone: initialSettings?.phone || siteConfig.contact.phone,
    email: initialSettings?.email || siteConfig.contact.email,
    rcNumber: initialSettings?.rcNumber || siteConfig.rcNumber,
    operatingHours:
      initialSettings?.operatingHours ||
      "Monday to Friday: 8:00 AM – 5:00 PM WAT\nWeekends & Public Holidays: Closed",
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type: formType }),
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const formTypes = [
    { id: "GENERAL", label: "General Enquiry" },
    { id: "PROGRAM_INQUIRY", label: "Programmes & Training" },
    { id: "PARTNERSHIP", label: "Partnership Proposal" },
    { id: "MEDIA", label: "Media & Press" },
    { id: "FACILITY", label: "Co-Working & Facilities" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* Form Column */}
      <div className="lg:col-span-7">
        {submitted ? (
          <div className="p-8 rounded-2xl bg-[#eaf4eb] border border-[#265728]/30">
            <div className="w-12 h-12 rounded-full bg-[#265728] text-white flex items-center justify-center font-bold text-xl mb-4">
              ✓
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Message Received
            </h3>
            <p className="mt-2 text-sm text-slate-700 leading-relaxed">
              Thank you for contacting Startup Jigawa. Our team will review your message and reply via email or phone within two working days.
            </p>
            <div className="mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    organization: "",
                    subject: "",
                    message: "",
                  });
                }}
              >
                Send Another Message
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                What is your enquiry about?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {formTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setFormType(type.id)}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all text-left ${
                      formType === type.id
                        ? "bg-[#265728] text-white border-[#265728] shadow-xs"
                        : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#265728]"
                  placeholder="e.g. Ibrahim Aliyu"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#265728]"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#265728]"
                  placeholder="0800 000 0000"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Organisation (Optional)
                </label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      organization: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#265728]"
                  placeholder="e.g. Tech NGO, Company"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#265728]"
                placeholder="Brief summary of your enquiry"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Message *
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#265728]"
                placeholder="Tell us more about your enquiry, project timeline, or questions..."
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={loading}
              className="w-full sm:w-auto"
            >
              Send Message &rarr;
            </Button>

            <p className="text-[11px] text-slate-400">
              Startup Jigawa respects your privacy. We only use your information to reply to your enquiry.
            </p>
          </form>
        )}
      </div>

      {/* Official Coordinates Column */}
      <div className="lg:col-span-5 space-y-6">
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-6">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-3">
            Office Details
          </h3>

          <div className="space-y-4 text-xs sm:text-sm">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Address
              </div>
              <div className="text-slate-800 font-semibold mt-1">
                {contactSettings.address}
              </div>
            </div>

            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Phone Number
              </div>
              <div className="text-slate-800 font-semibold mt-1">
                <a
                  href={`tel:${contactSettings.phone}`}
                  className="hover:text-[#265728]"
                >
                  {contactSettings.phone}
                </a>
              </div>
            </div>

            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Email
              </div>
              <div className="text-slate-800 font-semibold mt-1">
                <a
                  href={`mailto:${contactSettings.email}`}
                  className="hover:text-[#265728]"
                >
                  {contactSettings.email}
                </a>
              </div>
            </div>

            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                CAC Registration
              </div>
              <div className="text-slate-800 font-semibold mt-1">
                {contactSettings.rcNumber.startsWith("RC")
                  ? contactSettings.rcNumber
                  : `RC ${contactSettings.rcNumber}`}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <div className="text-xs font-bold text-slate-700 mb-2">
              Opening Hours
            </div>
            <p className="text-xs text-slate-500 whitespace-pre-line">
              {contactSettings.operatingHours}
            </p>
          </div>
        </div>

        {/* Accountability notice */}
        <div className="p-5 rounded-xl border border-slate-200 bg-white">
          <div className="text-xs font-bold text-slate-900 mb-1">
            Institutional Verification
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Startup Jigawa is a registered non-profit and innovation centre under CAC RC {contactSettings.rcNumber}. For official government or corporate inquiries, please email{" "}
            <a
              href={`mailto:${contactSettings.email}`}
              className="text-[#265728] font-bold hover:underline"
            >
              {contactSettings.email}
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}
