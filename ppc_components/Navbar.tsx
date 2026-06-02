"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#about" },
    { label: "Treatments", href: "#treatments" },
    { label: "Doctors", href: "#doctors" },
    { label: "Gallery", href: "#gallery" },
    { label: "Awards", href: "#awards" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <nav className="max-w-[1600px] mx-auto h-[70px] md:h-[85px] flex items-center justify-between px-6 md:px-12 gap-8">
        
        {/* LOGO - Optimized dimensions for Mobile Speed */}
        <a href="/" className="flex-shrink-0 transition-transform active:scale-95">
          <div className="relative w-[120px] h-[45px] md:w-[170px] md:h-[60px]">
            <Image
              src="/assets/photo/mainlogo.webp"
              alt="Abbad Dental Clinic"
              // SPECIFIC FIX: Using proper sizing prevents the "Image is larger than needed" warning
              width={175} 
              height={66}
              priority // CRITICAL: Loads the logo immediately for faster FCP
              fetchPriority="high"
              className="object-contain w-full h-full" // Preserves your exact UI look
            />
          </div>
        </a>

        {/* CENTER LINKS - PRESERVED UNCHANGED */}
        <ul className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 flex-1">
          {menuItems.map((item, idx) => (
            <li key={idx}>
              <a
                href={item.href}
                className="font-syne text-slate-700 hover:text-brand-blue text-[11px] xl:text-[12px] font-bold uppercase tracking-[0.1em] transition-colors duration-200 whitespace-nowrap"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* ACTION AREA - PRESERVED UNCHANGED */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="font-syne hidden sm:flex items-center gap-2 bg-black text-white px-6 py-3 md:px-7 md:py-3.5 rounded-full text-[10px] md:text-[11px] font-bold whitespace-nowrap transition-all hover:bg-brand-blue active:scale-95 shadow-md"
          >
            BOOK APPOINTMENT
            <span className="text-[14px]">↗</span>
          </a>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-black flex flex-col gap-1.5 items-end"
            aria-label="Toggle Menu"
          >
            <div className={`h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`}></div>
            <div className={`h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'w-6'}`}></div>
            <div className={`h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-4'}`}></div>
          </button>
        </div>
      </nav>

      {/* MOBILE DRAWER - PRESERVED UNCHANGED */}
      <div className={`lg:hidden absolute top-[70px] left-0 w-full bg-white border-b shadow-2xl overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-screen opacity-100 py-8' : 'max-h-0 opacity-0'}`}>
        <ul className="flex flex-col items-center gap-6 px-6">
          {menuItems.map((item, idx) => (
            <li key={idx} className="w-full text-center">
              <a
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-syne block text-slate-800 text-base font-bold uppercase tracking-widest py-2 hover:text-brand-blue transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="w-full pt-4 sm:hidden">
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-syne block bg-black text-white text-center py-4 rounded-xl font-bold uppercase text-xs tracking-widest"
            >
              Book Appointment ↗
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}