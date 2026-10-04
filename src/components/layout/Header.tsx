"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";

interface HeaderProps {
  onOpenMobileMenu?: () => void;
}

export function Header({ onOpenMobileMenu }: HeaderProps) {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [internalMobileOpen, setInternalMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setActiveDropdown(null);
    setInternalMobileOpen(false);
  }, [pathname]);

  const handleOpenMenu = () => {
    if (onOpenMobileMenu) {
      onOpenMobileMenu();
    } else {
      setInternalMobileOpen(true);
    }
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full bg-white transition-shadow duration-200 border-b border-slate-200",
          scrolled ? "shadow-md" : ""
        )}
      >
        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-20">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center group shrink-0 py-1" aria-label="Startup Jigawa Home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/startup-jigawa-logo.png"
                alt="Startup Jigawa"
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-102"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {mainNavigation.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname === item.href ||
                      (item.href !== "/" && pathname?.startsWith(item.href));

                if (item.children) {
                  return (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => setActiveDropdown(item.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown === item.label ? null : item.label
                          )
                        }
                        className={cn(
                          "px-3 py-2 text-xs xl:text-sm font-semibold rounded-md transition-colors flex items-center gap-1",
                          isActive
                            ? "text-[#265728] bg-[#eaf4eb]"
                            : "text-slate-700 hover:text-[#265728] hover:bg-slate-50"
                        )}
                        aria-expanded={activeDropdown === item.label}
                      >
                        <span>{item.label}</span>
                        <svg
                          className={cn(
                            "w-3.5 h-3.5 transition-transform duration-200 opacity-60",
                            activeDropdown === item.label ? "rotate-180" : ""
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

                      {/* Dropdown Menu */}
                      {activeDropdown === item.label && (
                        <div className="absolute top-full left-0 w-72 pt-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                          <div className="bg-white rounded-xl border border-slate-200/90 py-2 shadow-xl ring-1 ring-black/5">
                            {item.children.map((subItem) => (
                              <Link
                                key={subItem.label}
                                href={subItem.href}
                                className="block px-4 py-2.5 hover:bg-[#eaf4eb] transition-colors group/item"
                              >
                                <div className="text-xs font-bold text-slate-800 group-hover/item:text-[#265728]">
                                  {subItem.label}
                                </div>
                                {subItem.description && (
                                  <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                                    {subItem.description}
                                  </div>
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "px-3 py-2 text-xs xl:text-sm font-semibold rounded-md transition-colors",
                      isActive
                        ? "text-[#265728] bg-[#eaf4eb]"
                        : "text-slate-700 hover:text-[#265728] hover:bg-slate-50"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Action Button & Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Button
                href="/opportunities"
                variant="primary"
                size="sm"
                className="hidden sm:inline-flex text-xs font-bold"
              >
                Apply / Register
              </Button>

              {/* Hamburger Button */}
              <button
                type="button"
                onClick={handleOpenMenu}
                aria-label="Open Navigation Menu"
                className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#265728] transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Internal mobile drawer fallback */}
      <MobileMenu
        isOpen={internalMobileOpen}
        onClose={() => setInternalMobileOpen(false)}
      />
    </>
  );
}
