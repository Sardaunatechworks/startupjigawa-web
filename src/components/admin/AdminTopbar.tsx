"use client";

import React from "react";
import Link from "next/link";
import { Menu, Plus, ExternalLink, ShieldCheck } from "lucide-react";

interface AdminTopbarProps {
  title: string;
  subtitle?: string;
  onOpenMobileMenu?: () => void;
  actionButton?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
}

export function AdminTopbar({
  title,
  subtitle,
  onOpenMobileMenu,
  actionButton,
}: AdminTopbarProps) {
  return (
    <header className="sticky top-0 z-20 bg-white border-b border-slate-200/90 h-16 sm:h-18 flex items-center justify-between px-4 sm:px-8 shadow-2xs">
      <div className="flex items-center gap-3">
        {/* Mobile toggle */}
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-slate-500 hidden sm:block mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Supabase Status Pill */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#265728] text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>System Operational</span>
        </div>

        {/* Action Button */}
        {actionButton &&
          (actionButton.href ? (
            <Link
              href={actionButton.href}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-[#265728] hover:bg-[#1b411d] text-white text-xs font-bold shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>{actionButton.label}</span>
            </Link>
          ) : (
            <button
              type="button"
              onClick={actionButton.onClick}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-[#265728] hover:bg-[#1b411d] text-white text-xs font-bold shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>{actionButton.label}</span>
            </button>
          ))}

        {/* Public site link */}
        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-[#265728] px-2 py-1 rounded hover:bg-slate-100 transition-colors"
        >
          <span>Live Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    </header>
  );
}
