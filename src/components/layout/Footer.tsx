"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { footerNavigation } from "@/config/navigation";

export function Footer() {
  const [settings, setSettings] = useState({
    rcNumber: siteConfig.rcNumber,
    address: siteConfig.contact.address,
    email: siteConfig.contact.email,
    phone: siteConfig.contact.phone,
    orgName: siteConfig.legalName,
  });

  useEffect(() => {
    fetch("/api/cms/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          setSettings((prev) => ({
            ...prev,
            rcNumber: data.settings.rcNumber || prev.rcNumber,
            address: data.settings.address || prev.address,
            email: data.settings.email || prev.email,
            phone: data.settings.phone || prev.phone,
            orgName: data.settings.orgName || prev.orgName,
          }));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <footer className="bg-[#0f172a] text-slate-300 text-sm">
      {/* Newsletter strip */}
      <div className="border-b border-slate-800 bg-[#142315] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Stay In Touch
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Get updates on new training cohorts, fellowship opportunities, and research releases.
            </p>
          </div>
          <form
            action="/api/newsletter"
            method="POST"
            className="w-full md:w-auto flex-1 max-w-md"
          >
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className="px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#265728] text-sm flex-1"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-[#265728] hover:bg-[#1b411d] text-white font-semibold text-sm transition-colors whitespace-nowrap shadow-sm"
              >
                Subscribe
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              We respect your privacy. You can unsubscribe at any time.
            </p>
          </form>
        </div>
      </div>

      {/* Main Footer links */}
      <div className="max-w-7xl mx-auto py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Identity col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#265728] flex items-center justify-center text-white font-black text-xl">
                SJ
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight">
                  STARTUP JIGAWA LTD
                </span>
                <div className="text-xs text-emerald-400 font-medium">
                  RC: {settings.rcNumber}
                </div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              {siteConfig.description}
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div className="flex items-start gap-2">
                <span className="text-slate-200 font-medium">Address:</span>
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-200 font-medium">Email:</span>
                <a
                  href={`mailto:${settings.email}`}
                  className="hover:text-emerald-400"
                >
                  {settings.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-200 font-medium">Phone:</span>
                <a
                  href={`tel:${settings.phone}`}
                  className="hover:text-emerald-400"
                >
                  {settings.phone}
                </a>
              </div>
            </div>
          </div>

          {/* About Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              About Us
            </h4>
            <ul className="space-y-2.5 text-xs">
              {footerNavigation.about.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Programmes
            </h4>
            <ul className="space-y-2.5 text-xs">
              {footerNavigation.programs.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Innovation & Policy */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Innovation &amp; Labs
            </h4>
            <ul className="space-y-2.5 text-xs">
              {footerNavigation.innovation.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Startup Jigawa Ltd (RC 7256149). All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            {footerNavigation.legal.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="hover:text-slate-300 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
