import React from "react";
import { cn } from "@/lib/utils";

export interface AlertProps {
  type?: "info" | "warning" | "success" | "error";
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Alert({
  type = "info",
  title,
  children,
  className,
}: AlertProps) {
  const styles = {
    info: "bg-sky-50 text-sky-900 border-sky-200",
    warning: "bg-amber-50 text-amber-900 border-amber-200",
    success: "bg-emerald-50 text-emerald-900 border-emerald-200",
    error: "bg-rose-50 text-rose-900 border-rose-200",
  };

  return (
    <div
      role="alert"
      className={cn("p-4 rounded-lg border text-sm", styles[type], className)}
    >
      {title && <div className="font-semibold mb-1">{title}</div>}
      <div className="leading-relaxed">{children}</div>
    </div>
  );
}
