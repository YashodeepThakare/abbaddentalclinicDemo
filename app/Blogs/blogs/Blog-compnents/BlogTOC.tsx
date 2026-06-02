"use client";

import { useEffect, useState, useRef } from "react";
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";

// Helper to match IDs in the actual blog content
function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function BlogTOC({ content }: { content: any[] }) {
  const [active, setActive] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Extract headings from content prop
  const headings = content
    .filter((c: any) => c.type === "heading")
    .map((c: any) => c.text);

  useEffect(() => {
    const handler = () => {
      let current = "";
      // Offset of 160px matches your sticky top + a little buffer
      const detectionOffset = 160;

      headings.forEach((h: string) => {
        const id = slugify(h);
        const el = document.getElementById(id);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        // If the top of the heading has passed the offset point
        if (rect.top <= detectionOffset) {
          current = id;
        }
      });

      // Fallback: If at the very top of the page, highlight first heading
      if (!current && headings.length > 0 && window.scrollY < 200) {
        current = slugify(headings[0]);
      }

      setActive(current);
    };

    // Initialize and attach listener
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [headings]);

  // Auto-scroll the TOC container when the active item changes
  useEffect(() => {
    if (active && scrollRef.current) {
      const activeElement = document.getElementById(`toc-item-${active}`);
      if (activeElement) {
        // Scroll the container to keep the active element in view
        activeElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [active]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (headings.length === 0) return null;

  const handleItemClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  return (
    <>
      {/* Desktop TOC */}
      <LayoutGroup>
        <aside className="hidden lg:block sticky top-[100px] w-[280px] max-h-[calc(100vh-140px)] flex flex-col transform-gpu">
          <div className="relative pl-1 flex flex-col h-full max-h-[calc(100vh-140px)]">

            {/* Section Header */}
            <div className="flex items-center gap-4 mb-5 shrink-0">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 whitespace-nowrap">
                In this article
              </h3>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-slate-200 to-transparent" />
            </div>

            <div 
              ref={scrollRef}
              className="relative flex-1 overflow-y-auto pr-4 pb-4 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 hover:[&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full"
            >
              {/* Vertical Track Line */}
              <div className="absolute left-[3px] top-1 bottom-1 w-[2px] bg-slate-100/80 rounded-full" />

              <ul className="relative space-y-4">
                {headings.map((h: string, idx: number) => {
                  const id = slugify(h);
                  const isActive = active === id;

                  return (
                    <li key={id} id={`toc-item-${id}`} className="relative group">
                      <a
                        href={`#${id}`}
                        className={`relative flex items-start gap-4 pl-[22px] pr-4 py-0.5 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${isActive
                          ? "text-blue-950 translate-x-1"
                          : "text-slate-500 hover:text-slate-900 hover:translate-x-1"
                          }`}
                      >
                        {/* Active Indicator Pill */}
                        {isActive && (
                          <motion.div
                            layoutId="toc-indicator"
                            className="absolute left-[2px] top-[-4px] bottom-[-4px] w-[4px] bg-blue-600 rounded-full shadow-[0_0_12px_rgba(37,99,235,0.3)] z-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 350,
                              damping: 30
                            }}
                          />
                        )}

                        {/* Numbering */}
                        <span
                          className={`text-[11px] font-mono tracking-widest pt-[3px] transition-colors duration-300 ${isActive ? "text-blue-600 font-bold" : "text-slate-500 group-hover:text-slate-700"
                            }`}
                        >
                          {String(idx + 1).padStart(2, "0")}
                        </span>

                        {/* Heading Text */}
                        <span
                          className={`text-[13.5px] leading-snug tracking-tight transition-colors duration-300 ${isActive ? "font-bold" : "font-medium"
                            }`}
                        >
                          {h}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </aside>
      </LayoutGroup>

      {/* Mobile Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-[240px] right-6 lg:hidden z-40 flex items-center gap-2.5 px-4 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-[0_8px_30px_rgba(37,99,235,0.45)] border border-blue-500/20 backdrop-blur-md active:scale-95 transition-all duration-300 cursor-pointer"
      >
        <TOCIcon className="w-5 h-5 text-white" />
        <span className="text-sm font-semibold tracking-wide">Contents</span>
      </button>

      {/* Mobile Drawer (Table of Contents) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-50 lg:hidden"
            />

            {/* Slide-up Drawer */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[2.5rem] shadow-[0_-12px_40px_rgba(0,0,0,0.15)] z-50 lg:hidden flex flex-col max-h-[85vh] border-t border-slate-100/50 overflow-hidden"
            >
              {/* Drag Handle */}
              <div 
                onClick={() => setIsOpen(false)}
                className="w-12 h-1.5 bg-slate-200 hover:bg-slate-300 rounded-full mx-auto my-4 shrink-0 transition-colors cursor-pointer" 
              />

              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 pb-4 border-b border-slate-100 shrink-0">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg tracking-tight">
                    In this article
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Select a section to scroll to
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 text-slate-500 hover:bg-slate-200 active:scale-95 transition-all duration-200 cursor-pointer"
                >
                  <CloseIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto px-6 py-6 pb-12">
                <div className="relative pl-1">
                  {/* Vertical Timeline Track Line */}
                  <div className="absolute left-[3px] top-2 bottom-2 w-[2px] bg-slate-100 rounded-full" />

                  <ul className="relative space-y-2">
                    {headings.map((h: string, idx: number) => {
                      const id = slugify(h);
                      const isActive = active === id;

                      return (
                        <li key={id} className="relative group">
                          <a
                            href={`#${id}`}
                            onClick={(e) => handleItemClick(e, id)}
                            className={`w-full text-left relative flex items-start gap-4 pl-[22px] pr-4 py-3 transition-all duration-300 rounded-lg ${
                              isActive
                                ? "text-blue-950 font-bold bg-slate-50 translate-x-1"
                                : "text-slate-500 font-medium hover:text-slate-900 hover:translate-x-1"
                            }`}
                          >
                            {/* Active Indicator Pill */}
                            {isActive && (
                              <motion.div
                                layoutId="toc-indicator-mobile"
                                className="absolute left-[2px] top-[4px] bottom-[4px] w-[4px] bg-blue-600 rounded-full shadow-[0_0_12px_rgba(37,99,235,0.3)] z-10"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 350,
                                  damping: 30
                                }}
                              />
                            )}

                            {/* Numbering */}
                            <span
                              className={`text-[11px] font-mono tracking-widest pt-[3px] transition-colors duration-300 ${
                                isActive ? "text-blue-600 font-bold" : "text-slate-400"
                              }`}
                            >
                              {String(idx + 1).padStart(2, "0")}
                            </span>

                            {/* Heading Text */}
                            <span className="text-[14px] leading-snug tracking-tight">
                              {h}
                            </span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// Custom Icons for Mobile Drawer and Trigger Button
const TOCIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* 3 Dots */}
    <circle cx="5" cy="6" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="5" cy="18" r="1.5" fill="currentColor" stroke="none" />
    {/* 3 Lines */}
    <line x1="11" y1="6" x2="20" y2="6" />
    <line x1="11" y1="12" x2="20" y2="12" />
    <line x1="11" y1="18" x2="20" y2="18" />
  </svg>
);

const CloseIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);