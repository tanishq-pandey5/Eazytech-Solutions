import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  showSubtitle?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className = "", showSubtitle = true, size = "md" }: LogoProps) {
  const iconSizes = {
    sm: "w-8 h-8 rounded-lg",
    md: "w-9 h-9 rounded-lg",
    lg: "w-11 h-11 rounded-xl",
  };

  const titleSizes = {
    sm: "text-base tracking-tight",
    md: "text-lg tracking-tight",
    lg: "text-2xl tracking-tight",
  };

  const subtitleSizes = {
    sm: "text-[9px] tracking-widest",
    md: "text-[10px] tracking-widest",
    lg: "text-xs tracking-wider",
  };

  return (
    <Link
      href="#top"
      className={`inline-flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan rounded-lg ${className}`}
      aria-label="Eazy Tech Solutions Home"
    >
      {/* Geometric E Monogram Icon */}
      <div
        className={`${iconSizes[size]} bg-gradient-to-br from-[#45E3FF] via-[#36D7F5] to-[#1EA3C4] flex items-center justify-center p-1.5 shadow-cyan-glow-sm transition-transform duration-300 group-hover:scale-105 shrink-0`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          aria-hidden="true"
        >
          {/* Stylized Modern Industrial E Monogram */}
          <path
            d="M5 4.5H19C19.5523 4.5 20 4.94772 20 5.5V7C20 7.55228 19.5523 8 19 8H9V10.5H17C17.5523 10.5 18 10.9477 18 11.5V13C18 13.5523 17.5523 14 17 14H9V16.5H19C19.5523 16.5 20 16.9477 20 17.5V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19V5.5C4 4.94772 4.44772 4.5 5 4.5Z"
            fill="#071321"
          />
          {/* Subtle Power Accent Dot */}
          <circle cx="15.5" cy="12.25" r="1.25" fill="#36D7F5" />
        </svg>
      </div>

      {/* Wordmark and Subtitle */}
      <div className="flex flex-col">
        <div className={`font-extrabold leading-none ${titleSizes[size]} text-brand-text flex items-center gap-1.5`}>
          <span>EAZY TECH</span>
          <span className="text-brand-cyan">SOLUTIONS</span>
        </div>
        {showSubtitle && (
          <span
            className={`font-semibold uppercase text-brand-cyan/85 mt-1 leading-none ${subtitleSizes[size]}`}
          >
            END-TO-END CRITICAL POWER SERVICE PROVIDER
          </span>
        )}
      </div>
    </Link>
  );
}
