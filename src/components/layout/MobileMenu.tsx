"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const toggleSection = (label: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Slide-out Menu Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl flex flex-col z-50 overflow-y-auto animate-in slide-in-from-right duration-200">
        {/* Header bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <Link href="/" onClick={onClose} className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/startup-jigawa-logo.png"
              alt="Startup Jigawa"
              className="h-9 w-auto object-contain"
            />
          </Link>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
            aria-label="Close menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 px-4 py-5 space-y-1 divide-y divide-slate-100">
          {mainNavigation.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href ||
                  (item.href !== "/" && pathname?.startsWith(item.href));
            const isExpanded = !!expandedSections[item.label];

            return (
              <div key={item.label} className="pt-2 first:pt-0">
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex-1 px-3 py-2 text-sm font-semibold rounded-lg transition-colors",
                      isActive
                        ? "bg-[#eaf4eb] text-[#265728]"
                        : "text-slate-800 hover:bg-slate-100 hover:text-[#265728]"
                    )}
                  >
                    {item.label}
                  </Link>

                  {item.children && (
                    <button
                      type="button"
                      onClick={() => toggleSection(item.label)}
                      className="p-2 text-slate-400 hover:text-slate-700 rounded-md"
                      aria-label={`Toggle ${item.label} sub-menu`}
                    >
                      <svg
                        className={cn(
                          "w-4 h-4 transition-transform duration-200",
                          isExpanded ? "rotate-180" : ""
                        )}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                {item.children && isExpanded && (
                  <div className="pl-4 pr-2 py-1.5 mt-1 space-y-1 bg-slate-50/70 rounded-lg ml-2 border-l-2 border-[#265728]">
                    {item.children.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        onClick={onClose}
                        className="block px-3 py-2 text-xs font-medium text-slate-700 hover:text-[#265728] hover:bg-[#eaf4eb]/60 rounded-md transition-colors"
                      >
                        <div className="font-semibold">{subItem.label}</div>
                        {subItem.description && (
                          <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                            {subItem.description}
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 space-y-3">
          <Button
            href="/opportunities"
            variant="primary"
            className="w-full justify-center text-xs font-bold py-3"
            onClick={onClose}
          >
            Apply for Programs &amp; Calls &rarr;
          </Button>

          <div className="text-[11px] text-slate-500 space-y-1 text-center pt-1">
            <p className="font-semibold text-slate-700">Dutse, Jigawa State</p>
            <p>
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="hover:text-[#265728]"
              >
                Hotline: {siteConfig.contact.phone}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="hover:text-[#265728]"
              >
                {siteConfig.contact.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
