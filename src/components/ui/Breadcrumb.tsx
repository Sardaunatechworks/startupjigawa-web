import React from "react";
import Link from "next/link";

export interface BreadcrumbProps {
  items: Array<{
    label: string;
    href?: string;
  }>;
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-slate-500">
      <Link href="/" className="hover:text-[#265728] transition-colors">
        Home
      </Link>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <span className="text-slate-300">/</span>
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-[#265728] transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-800 font-semibold">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
