"use client";

import React, { useState } from "react";
import { TeamMember } from "@/types";

interface TeamMemberCardProps {
  member: TeamMember;
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const initial =
    member.initial || (member.name ? member.name.trim().charAt(0) : "S");

  return (
    <>
      <div className="group flex flex-col rounded-2xl border border-slate-300/80 bg-white overflow-hidden shadow-sm hover:shadow-md hover:border-slate-400 transition-all duration-200">
        {/* Top visual portrait area (Properly sized for portrait headshots with object-top) */}
        <div className="h-64 sm:h-72 w-full bg-gradient-to-b from-[#154685] via-[#0d315e] to-[#071a33] flex items-center justify-center relative overflow-hidden">
          {member.profilePic ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={member.profilePic}
              alt={member.name}
              className="w-full h-full object-cover object-top transition-transform duration-300 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="select-none flex flex-col items-center justify-center p-6 text-center">
              <span className="text-6xl sm:text-7xl font-black text-white tracking-tight drop-shadow-sm transition-transform duration-300 group-hover:scale-110">
                {initial}
              </span>
              {member.department && (
                <span className="mt-3 text-[10px] uppercase font-bold tracking-wider text-emerald-300/80 bg-black/20 px-2.5 py-0.5 rounded-full">
                  {member.department}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Middle text area */}
        <div className="p-4 sm:p-5 bg-white flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug group-hover:text-[#265728] transition-colors">
              {member.name}
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-[#1e7e34] mt-1 leading-snug">
              {member.role}
            </p>
          </div>
        </div>

        {/* Bottom action button */}
        <div className="p-3.5 bg-slate-50/70 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="w-full py-2 px-4 rounded-lg border border-emerald-600/40 hover:border-emerald-700 bg-white hover:bg-emerald-50 text-emerald-800 text-xs sm:text-sm font-bold tracking-wide transition-all shadow-2xs text-center"
          >
            View Biography
          </button>
        </div>
      </div>

      {/* Biography Modal Dialog */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setModalOpen(false)}
          />

          {/* Dialog Container */}
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in zoom-in-95 duration-150">
            {/* Modal Header with handsome portrait */}
            <div className="bg-gradient-to-r from-[#0d315e] to-[#154685] p-6 text-white flex items-start justify-between">
              <div className="flex items-center gap-4">
                {member.profilePic ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={member.profilePic}
                    alt={member.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover object-top shrink-0 border-2 border-white/40 shadow-lg"
                  />
                ) : (
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/10 border-2 border-white/30 flex items-center justify-center text-white font-black text-3xl shrink-0 shadow-lg">
                    {initial}
                  </div>
                )}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {member.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-200 font-medium mt-0.5">
                    {member.role}
                  </p>
                  {member.department && (
                    <span className="inline-block text-[10px] uppercase font-bold tracking-wider text-emerald-100 bg-white/10 px-2 py-0.5 rounded mt-2">
                      {member.department}
                    </span>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close dialog"
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
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Professional Biography
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed font-normal">
                  {member.bio || "No biographical information available yet."}
                </p>
              </div>

              {member.contactEmail && (
                <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-600">
                  <span className="font-semibold text-slate-700">Official Contact:</span>
                  <a
                    href={`mailto:${member.contactEmail}`}
                    className="text-[#1e7e34] hover:underline font-medium"
                  >
                    {member.contactEmail}
                  </a>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
