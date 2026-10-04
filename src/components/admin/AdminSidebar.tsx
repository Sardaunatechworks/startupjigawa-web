"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  GraduationCap,
  Briefcase,
  Mail,
  Users,
  Handshake,
  Settings,
  ExternalLink,
  LogOut,
} from "lucide-react";

const navigation = [
  { name: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Programmes", href: "/admin/programs", icon: GraduationCap },
  { name: "Opportunities", href: "/admin/opportunities", icon: Briefcase },
  { name: "Inquiries & Inbox", href: "/admin/inquiries", icon: Mail },
  { name: "Team Members", href: "/admin/team", icon: Users },
  { name: "Partners", href: "/admin/partners", icon: Handshake },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function AdminSidebar({ mobileOpen, onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname();

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0a180b] text-slate-200 border-r border-emerald-950/60 select-none">
      {/* Brand Header */}
      <div className="p-6 border-b border-emerald-900/40">
        <Link href="/admin/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#265728] flex items-center justify-center text-white font-black text-xl shadow group-hover:bg-[#1b411d] transition-colors">
            SJ
          </div>
          <div>
            <div className="text-sm font-extrabold text-white tracking-tight leading-none">
              STARTUP JIGAWA
            </div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 mt-1">
              Admin &middot; CMS Console
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-emerald-300/60">
          Management
        </div>
        {navigation.map((item) => {
          const isActive =
            item.href === "/admin/dashboard"
              ? pathname === "/admin/dashboard" || pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onCloseMobile}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all",
                isActive
                  ? "bg-[#265728] text-white shadow-sm font-bold"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon
                className={cn(
                  "w-4 h-4",
                  isActive ? "text-white" : "text-emerald-400/80"
                )}
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Public Link & Admin Info */}
      <div className="p-4 border-t border-emerald-900/40 space-y-3 bg-black/20">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
            <span>View Public Site</span>
          </span>
          <span className="text-[10px] text-slate-500 font-mono">&rarr;</span>
        </Link>

        <div className="pt-2 border-t border-emerald-950/60 flex items-center justify-between px-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-800 text-white font-bold text-xs flex items-center justify-center">
              AD
            </div>
            <div>
              <div className="text-xs font-bold text-white leading-tight">
                Admin Staff
              </div>
              <div className="text-[10px] text-emerald-400/80">
                admin@startupjigawa.com.ng
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={async () => {
              try {
                await fetch("/api/auth/logout", { method: "POST" });
              } finally {
                window.location.href = "/admin/login";
              }
            }}
            title="Log Out of CMS"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-white/5 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 fixed inset-y-0 left-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Slideout Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="fixed inset-y-0 left-0 w-72 max-w-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
