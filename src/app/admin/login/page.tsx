"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Eye, EyeOff, ShieldCheck, Lock, Mail, ArrowRight } from "lucide-react";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("from") || "/admin/dashboard";

  const [email, setEmail] = useState("admin@startupjigawa.com.ng");
  const [password, setPassword] = useState("Jigawa2026!Admin");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Authentication failed. Please check your credentials.");
        return;
      }

      // Successfully authenticated
      router.push(returnTo);
      router.refresh();
    } catch (err) {
      console.error("Login request error:", err);
      setError("Network or server connection issue. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[#071308] text-slate-100 relative overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-900/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-emerald-800/20 blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10 px-4">
        {/* Brand Logo with white container */}
        <div className="inline-block p-3 rounded-2xl bg-white/95 shadow-xl backdrop-blur-xs mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/startup-jigawa-logo.png"
            alt="Startup Jigawa"
            className="h-12 sm:h-14 w-auto object-contain"
          />
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
          Staff CMS Authentication Portal
        </h2>
        <p className="mt-1 text-xs uppercase tracking-wider text-emerald-400 font-bold">
          RC {siteConfig.rcNumber} &middot; Dutse Hub Management
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0 z-10">
        <div className="bg-slate-900/90 backdrop-blur-md border border-emerald-900/40 py-8 px-6 sm:px-10 rounded-2xl shadow-2xl space-y-6">
          <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 text-xs">
            <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>Secure session enforcement active. Please sign in to continue.</span>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs leading-relaxed animate-in fade-in">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5"
              >
                Staff Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@startupjigawa.com.ng"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder:text-slate-500 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#265728] focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-bold text-slate-300 uppercase tracking-wider"
                >
                  Security Password
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder:text-slate-500 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#265728] focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 p-1 text-slate-400 hover:text-white transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#265728] border-slate-700 bg-slate-950 focus:ring-[#265728]"
                />
                <span className="text-xs text-slate-400 select-none">Remember this device</span>
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={loading}
              className="w-full justify-center text-xs sm:text-sm font-bold py-3 mt-2 shadow-lg hover:shadow-emerald-950/50"
            >
              Sign In to CMS Console
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </form>

          {/* Configuration Hint for Developer/User */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5 text-left">
            <div className="text-[11px] font-bold text-slate-300 flex items-center justify-between">
              <span>Admin Credentials (.env configured)</span>
              <span className="text-[10px] text-emerald-400 font-mono">Ready</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono space-y-0.5">
              <div>Email: <span className="text-emerald-300">admin@startupjigawa.com.ng</span></div>
              <div>Password: <span className="text-emerald-300">Jigawa2026!Admin</span></div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
            <Link
              href="/"
              className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
            >
              &larr; Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#071308] text-emerald-400">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-400" />
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
