import React from "react";
import Link from "next/link";
import { Post } from "@/types";
import { formatDate } from "@/lib/utils";

interface NewsCardProps {
  post: Post;
}

export function NewsCard({ post }: NewsCardProps) {
  return (
    <article className="flex flex-col rounded-xl border border-slate-200 bg-white overflow-hidden shadow-subtle hover:shadow-card-hover hover:border-[#265728]/30 transition-all duration-200">
      <div className="h-44 bg-slate-100 relative overflow-hidden">
        {post.coverImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverImageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-slate-800 flex items-center justify-center p-6 text-center text-slate-300">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              {post.category || "Official Release"}
            </span>
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <span className="text-[#265728] font-semibold">
              {post.category}
            </span>
            <span>•</span>
            <time dateTime={post.publishedAt || ""}>
              {formatDate(post.publishedAt)}
            </time>
          </div>

          <h3 className="text-base font-bold text-slate-900 line-clamp-2 hover:text-[#265728] transition-colors leading-snug">
            <Link href={`/news-events/${post.slug}`}>{post.title}</Link>
          </h3>

          <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>By {post.authorName || "Startup Jigawa Media"}</span>
          <Link
            href={`/news-events/${post.slug}`}
            className="font-semibold text-[#265728] hover:underline"
          >
            Read article &rarr;
          </Link>
        </div>
      </div>
    </article>
  );
}
