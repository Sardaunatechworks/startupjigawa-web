import React from "react";
import { Metadata } from "next";
import { AdminLayoutClient } from "@/components/admin/AdminLayoutClient";

export const metadata: Metadata = {
  title: "Staff CMS Portal | Startup Jigawa",
  description: "Internal content management and operational dashboard for Startup Jigawa Ltd.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
