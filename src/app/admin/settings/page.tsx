"use client";

import React, { useState } from "react";
import { ImageUpload } from "@/components/ui/ImageUpload";

export default function AdminSettingsPage() {
  const [rcNumber, setRcNumber] = useState("RC 7256149");
  const [orgName, setOrgName] = useState("Startup Jigawa (Jigawa Innovation Center)");
  const [email, setEmail] = useState("info@startupjigawa.com.ng");
  const [phone, setPhone] = useState("+234 803 000 0000");
  const [address, setAddress] = useState("Innovation Hub Complex, Kiyawa Road, Dutse, Jigawa State, Nigeria");
  const [operatingHours, setOperatingHours] = useState("Monday – Friday: 8:00 AM – 5:00 PM WAT");
  const [isSaved, setIsSaved] = useState(false);

  // Hero section settings
  const [heroTitle, setHeroTitle] = useState("Building Practical Skills, Supporting Local Ideas, and Strengthening Communities in Jigawa");
  const [heroDescription, setHeroDescription] = useState("Startup Jigawa is a technology and innovation centre in Dutse. Over the past nine years, we have trained more than 50,000 people in practical digital skills, built technology tools for local challenges, and collaborated with government and community partners across the state.");
  const [heroBackgroundImage, setHeroBackgroundImage] = useState("");
  const [heroBackgroundOpacity, setHeroBackgroundOpacity] = useState(20);
  const [heroEnableAnimation, setHeroEnableAnimation] = useState(true);

  // System toggles
  const [applicationsEnabled, setApplicationsEnabled] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  React.useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/cms/settings");
        const data = await res.json();
        if (data.success && data.settings) {
          setOrgName(data.settings.orgName || "");
          setRcNumber(data.settings.rcNumber || "");
          setEmail(data.settings.email || "");
          setPhone(data.settings.phone || "");
          setAddress(data.settings.address || "");
          setOperatingHours(data.settings.operatingHours || "");
          setApplicationsEnabled(data.settings.applicationsEnabled ?? true);
          setEmailAlerts(data.settings.emailAlerts ?? true);
          setMaintenanceMode(data.settings.maintenanceMode ?? false);

          if (data.settings.hero) {
            setHeroTitle(data.settings.hero.title || "Building Practical Skills, Supporting Local Ideas, and Strengthening Communities in Jigawa");
            setHeroDescription(data.settings.hero.description || "");
            setHeroBackgroundImage(data.settings.hero.backgroundImage || "");
            setHeroBackgroundOpacity(data.settings.hero.backgroundOpacity ?? 20);
            setHeroEnableAnimation(data.settings.hero.enableAnimation ?? true);
          }
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/cms/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orgName,
          rcNumber,
          email,
          phone,
          address,
          operatingHours,
          applicationsEnabled,
          emailAlerts,
          maintenanceMode,
          hero: {
            title: heroTitle,
            description: heroDescription,
            backgroundImage: heroBackgroundImage,
            backgroundOpacity: Number(heroBackgroundOpacity),
            enableAnimation: heroEnableAnimation,
          },
        }),
      });
      if (res.ok) {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 4000);
      }
    } catch (err) {
      console.error("Failed to save settings:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">System &amp; Institutional Settings</h1>
        <p className="text-sm text-slate-600 mt-1">
          Configure corporate registration details, headquarters contact points, and portal availability.
        </p>
      </div>

      {isSaved && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center justify-between animate-in fade-in">
          <span>✓ Settings saved successfully. Changes are now active across public pages.</span>
          <button onClick={() => setIsSaved(false)} className="text-emerald-700">✕</button>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Corporate Legal Identity */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Corporate &amp; Legal Identity</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified legal incorporation details per Corporate Affairs Commission (CAC).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Organisation Registered Name
              </label>
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#265728]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                CAC Registration Number
              </label>
              <input
                type="text"
                value={rcNumber}
                onChange={(e) => setRcNumber(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#265728]"
              />
            </div>
          </div>
        </div>

        {/* Contact & Operating Channels */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Contact &amp; Public Channels</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Channels shown in page footers, inquiry forms, and official correspondence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Primary Contact Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#265728]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Headquarters Telephone
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#265728]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Physical Headquarters Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#265728]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Public Operating Hours
            </label>
            <input
              type="text"
              value={operatingHours}
              onChange={(e) => setOperatingHours(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#265728]"
            />
          </div>
        </div>

        {/* Hero Section & Visual Background */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Hero Section &amp; Background Image (Landing Page)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Customize the transparent background image, headline, and animations displayed behind the main landing page hero.
              </p>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-[#eaf4eb] px-2.5 py-1 rounded-md">
              Live Real-Time Sync
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Hero Main Headline
            </label>
            <input
              type="text"
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              placeholder="Building Practical Skills, Supporting Local Ideas, and Strengthening Communities in Jigawa"
              className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#265728]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Hero Narrative / Description
            </label>
            <textarea
              rows={3}
              value={heroDescription}
              onChange={(e) => setHeroDescription(e.target.value)}
              placeholder="Startup Jigawa is a technology and innovation centre in Dutse..."
              className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#265728]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Transparent Background Image
            </label>
            <ImageUpload
              value={heroBackgroundImage}
              onChange={setHeroBackgroundImage}
              folder="hero"
              label="Hero Background Image (from local computer)"
              helperText="Upload any workspace, Dutse landscape, or hub photo from your computer. It will render transparently behind the hero text."
              aspectRatio="landscape"
            />
          </div>

          {heroBackgroundImage && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Background Transparency / Opacity
                  </label>
                  <span className="text-xs font-extrabold text-[#265728]">
                    {heroBackgroundOpacity}%
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="5"
                  value={heroBackgroundOpacity}
                  onChange={(e) => setHeroBackgroundOpacity(Number(e.target.value))}
                  className="w-full accent-[#265728] cursor-pointer"
                />
                <span className="text-[10px] text-slate-400">
                  Recommended: 15% – 25% for high text readability
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-xs font-bold text-slate-800 block">
                    Ambient Background Motion
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Smooth floating Ken-Burns pan/zoom transition
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={heroEnableAnimation}
                  onChange={(e) => setHeroEnableAnimation(e.target.checked)}
                  className="w-4 h-4 text-[#265728] rounded border-slate-300 focus:ring-[#265728]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Feature Switches */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Portal Availability &amp; Alerts</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Control public registration intakes and operational alert dispatching.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            <div className="py-3 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Accept Public Programme Applications</span>
                <span className="text-[11px] text-slate-500">Allow visitors to submit intake applications on active cohorts</span>
              </div>
              <input
                type="checkbox"
                checked={applicationsEnabled}
                onChange={(e) => setApplicationsEnabled(e.target.checked)}
                className="w-4 h-4 text-[#265728] rounded border-slate-300 focus:ring-[#265728]"
              />
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Dispatch Email Alerts on Inquiries</span>
                <span className="text-[11px] text-slate-500">Send instant SMTP notifications to staff when contact forms are submitted</span>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 text-[#265728] rounded border-slate-300 focus:ring-[#265728]"
              />
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Maintenance Mode</span>
                <span className="text-[11px] text-slate-500">Temporarily display a scheduled maintenance banner on public pages</span>
              </div>
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={(e) => setMaintenanceMode(e.target.checked)}
                className="w-4 h-4 text-[#265728] rounded border-slate-300 focus:ring-[#265728]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving || loading}
            className="px-6 py-2.5 rounded-xl bg-[#265728] hover:bg-[#1b411d] disabled:opacity-50 text-white text-xs font-bold shadow-md transition-colors"
          >
            {saving ? "Saving Changes..." : "Save Settings Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
