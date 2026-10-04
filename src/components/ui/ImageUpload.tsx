"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, X, Loader2, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  value?: string | null;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
  helperText?: string;
  shape?: "square" | "rounded" | "circle";
  aspectRatio?: "square" | "landscape";
}

export function ImageUpload({
  value,
  onChange,
  folder = "general",
  label = "Upload Image",
  helperText = "PNG, JPG, WEBP or SVG up to 5MB",
  shape = "rounded",
  aspectRatio = "square",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync if external value changes
  React.useEffect(() => {
    setPreview(value || null);
  }, [value]);

  const handleFile = async (file: File) => {
    setError(null);

    // Validate type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    // Validate size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File exceeds 5MB size limit.");
      return;
    }

    // Show immediate local preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      onChange(data.url);
      setPreview(data.url);
    } catch (err: any) {
      console.error("Upload failed:", err);
      setError(err.message || "Failed to upload image. Please try again.");
      // If error, rollback preview if no initial value
      if (!value) setPreview(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const roundedClasses =
    shape === "circle"
      ? "rounded-full"
      : shape === "rounded"
      ? "rounded-xl"
      : "rounded-md";

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          {label}
        </label>
      )}

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed border-slate-300 hover:border-[#265728] transition-all bg-slate-50/60 hover:bg-slate-50 cursor-pointer overflow-hidden p-4 flex flex-col items-center justify-center text-center group ${roundedClasses} ${
          aspectRatio === "landscape" ? "min-h-[140px]" : "min-h-[120px]"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/svg+xml"
          onChange={handleInputChange}
          className="hidden"
        />

        {preview ? (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Uploaded image"
              className={`max-h-28 max-w-full object-contain ${
                shape === "circle" ? "w-24 h-24 rounded-full object-cover" : "rounded-lg"
              }`}
            />

            {/* Remove / Change overlay button */}
            <div className="absolute top-0 right-0 flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleRemove}
                title="Remove image"
                className="p-1 rounded-full bg-slate-900/70 hover:bg-rose-600 text-white transition-colors shadow-xs"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Uploading indicator */}
            {isUploading && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex items-center justify-center gap-2 rounded-lg">
                <Loader2 className="w-4 h-4 animate-spin text-[#265728]" />
                <span className="text-xs font-semibold text-slate-700">Uploading from computer...</span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-2 space-y-2">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#265728] flex items-center justify-center group-hover:scale-105 transition-transform">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800 group-hover:text-[#265728] transition-colors">
                Click to browse image from computer
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                or drag and drop your file here
              </div>
            </div>
            {helperText && (
              <span className="text-[10px] text-slate-400">{helperText}</span>
            )}
          </div>
        )}
      </div>

      {error && (
        <div className="text-[11px] font-semibold text-rose-600 animate-in fade-in">
          {error}
        </div>
      )}
    </div>
  );
}
