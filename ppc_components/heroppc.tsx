"use client";

import React from "react";
import Image from "next/image";

export default function Hero() {
  const stats = [
    { number: "20000+", label: "HAPPY SMILES" },
    { number: "16+", label: "YEARS EXP." },
    { number: "1000+", label: "IMPLANTS" },
    { number: "4.9", label: "RATING" },
  ];

  return (
    <section 
      id="home"
      className="relative w-full min-h-[100dvh] flex items-center bg-[#F1EFE8] pt-20 pb-12 md:pt-32 md:pb-16 lg:pt-26 lg:pb-24 overflow-x-hidden"
    >
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-gradient-to-bl from-[#3563A8]/5 to-transparent pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center relative z-10">
        
        {/* RIGHT IMAGE SECTION - Laptop layout preserved */}
        <div className="relative order-1 lg:order-2 w-full flex justify-center lg:justify-end">
          <div className="relative w-[80%] xs:w-[75%] lg:w-full aspect-[4/5] max-w-[320px] md:max-w-[480px]">
            <div className="absolute inset-0 translate-x-3 translate-y-3 md:translate-x-6 md:translate-y-6 border-[2px] md:border-[3px] border-[#3563A8]/30 rounded-[35px] md:rounded-[70px] z-0"></div>
            
            <div className="relative w-full h-full rounded-[30px] md:rounded-[50px] overflow-hidden shadow-2xl border-[6px] md:border-[6px] border-white bg-white z-10">
              <Image
                src="/assets/photo/ppcimage.JPG"
                alt="Abbad Dental Clinic"
                fill
                priority 
                fetchPriority="high"
                className="object-cover"
                sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 480px" 
              />
            </div>
          </div>
        </div>

        {/* LEFT CONTENT SECTION */}
        <div className="flex flex-col space-y-6 md:space-y-9 z-10 order-2 lg:order-1 items-start">
          <div className="space-y-3 md:space-y-4">
            <p className="font-syne text-[#3563A8] font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs">
              EXPERT CARE FOR EVERY STAGE OF LIFE
            </p>
            
            <h1 className="font-playfair text-[#1A1A1A] text-[32px] xs:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.2] md:leading-[1.15] font-medium tracking-tight">
              Trusted Dentist in <br className="hidden xs:block" /> 
              <span className="font-syne italic text-[#3563A8]">Nashik</span> for <br className="hidden xs:block" /> 
              <span className="font-syne">Luxury Dental Care</span>
            </h1>
          </div>

          <p className="font-outfit text-slate-600 text-sm md:text-lg max-w-[480px] leading-relaxed">
            Experience world-class dental care at Abbad Dental Clinic. 
            Specializing in advanced oral health and implant surgery.
          </p>

          {/* BUTTON LOGIC: Hidden on smallest mobile screens to help stats look perfect */}
          <div className="pt-1 md:pt-2">
            <a
              href="#contact"
              className="font-syne hidden sm:inline-block bg-black text-white px-7 py-4 md:px-10 md:py-5 rounded-full text-[10px] md:text-xs font-extrabold uppercase tracking-widest transition-all hover:bg-[#3563A8] active:scale-95 shadow-xl shadow-black/10"
            >
              BOOK YOUR VISIT ↗
            </a>
          </div>

          {/* STATS SECTION - Now appears cleaner on mobile */}
          <div className="flex justify-between lg:justify-start lg:gap-x-12 pt-4 md:pt-8 border-t border-slate-300/60 w-full lg:w-fit">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col space-y-0.3 md:space-y-1">
                <span className="font-inter text-[19px] xs:text-lg md:text-3xl font-bold text-[#1A1A1A] tracking-tight leading-none whitespace-nowrap">
                  {stat.number}
                </span>
                <span className="font-inter text-[8px] xs:text-[10px] md:text-xs uppercase tracking-wider text-slate-400 font-medium leading-tight">
                  {stat.label.split(' ').map((word, i) => (
                    <React.Fragment key={i}>
                      {word} <br className="xs:hidden" />
                    </React.Fragment>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}