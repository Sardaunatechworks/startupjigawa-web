"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminSidebar } from "./AdminSidebar";

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(pathname !== "/admin/login");

  useEffect(() => {
    if (pathname === "/admin/login") {
      setCheckingAuth(false);
      return;
    }

    // Verify session
    let isMounted = true;
    fetch("/api/auth/session")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unauthenticated");
        }
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          if (!data.authenticated) {
            router.replace(`/admin/login?from=${encodeURIComponent(pathname)}`);
          } else {
            setCheckingAuth(false);
          }
        }
      })
      .catch(() => {
        if (isMounted) {
          router.replace(`/admin/login?from=${encodeURIComponent(pathname)}`);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [pathname, router]);

  // If on login page, don't show admin sidebar/chrome
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-emerald-400">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-400" />
          <span className="text-xs font-medium text-slate-400">Verifying staff credentials...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <AdminSidebar
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            // pass onOpenMobileMenu if the child accepts it
            return React.cloneElement(child as React.ReactElement<{ onOpenMobileMenu?: () => void }>, {
              onOpenMobileMenu: () => setMobileOpen(true),
            });
          }
          return child;
        })}
      </div>
    </div>
  );
}
