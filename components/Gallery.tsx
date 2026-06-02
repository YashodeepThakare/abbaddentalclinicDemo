"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import Image from 'next/image';

// --- TYPES & INTERFACES ---
interface GalleryItem {
  id: number;
  type: string;
  patient: string;
  desc: string;
  img: string;
}

// --- DATA CONFIGURATION ---
const generateGalleryData = (): GalleryItem[] => {
  const types = ["Veneers", "Implants", "Whitening", "Aligners", "Bonding", "Rehab"];

  return Array.from({ length: 24 }).map((_, i) => {
    const uniqueId = i + 1;
    return {
      id: i,
      type: types[i % types.length],
      patient: "",
      desc: "Aesthetic Correction Series",
      img: `/assets/photo/P${uniqueId}.jpg`
    };
  });
};

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const loadScript = (src: string): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof document === 'undefined') return resolve(false);
    if (document.querySelector(`script[src="${src}"]`)) return resolve(true);
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function DentalShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [libsReady, setLibsReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [columnData, setColumnData] = useState<GalleryItem[][]>([]);

  useEffect(() => {
    const updateLayout = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      const cols = mobile ? 2 : 5;

      const masterData = shuffleArray(generateGalleryData());
      const itemsPerCol = Math.floor(masterData.length / cols);
      const newCols: GalleryItem[][] = [];
      for (let i = 0; i < cols; i++) {
        newCols.push(masterData.slice(i * itemsPerCol, (i + 1) * itemsPerCol));
      }
      setColumnData(newCols);
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);

    const initLibs = async () => {
      const gsapOk = await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js');
      if (gsapOk) setLibsReady(true);
    };
    initLibs();

    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  useLayoutEffect(() => {
    if (!libsReady || !columnData.length) return;

    const gsap = (window as any).gsap;
    if (!gsap) return;

    const ctx = gsap.context(() => {
      if (!isMobile) {
        columnData.forEach((_, i) => {
          const target = `.col-track-${i}`;
          const direction = i % 2 === 0 ? -1 : 1;
          const speed = 25 + i * 5 + Math.random() * 5;

          gsap.fromTo(
            target,
            { yPercent: direction === -1 ? 0 : -50 },
            {
              yPercent: direction === -1 ? -50 : 0,
              duration: speed,
              ease: "none",
              repeat: -1,
            }
          );
        });
      } else {
        gsap.fromTo(
          ".mobile-track",
          { xPercent: 0 },
          {
            xPercent: -50,
            duration: 45,
            ease: "none",
            repeat: -1,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [libsReady, columnData, isMobile]);

  if (!libsReady) return (
    <div className="h-screen bg-[#FAF7F2] flex items-center justify-center text-[#3563A8] font-serif animate-pulse tracking-widest">
      LOADING GALLERY...
    </div>
  );

  return (
    <div
      id='gallery'
      ref={containerRef}
      className="relative w-full h-screen bg-[#FAF7F2] overflow-hidden text-[#1a1a1a] font-sans select-none"
    >
      {/* DESKTOP LAYOUT */}
      {!isMobile && (
        <div className="absolute inset-0 grid grid-cols-5 gap-4 px-4 h-[120%] -top-[10%]">
          {columnData.map((colItems, colIndex) => (
            <div key={colIndex} className="relative h-full overflow-hidden">
              <div className={`col-track-${colIndex} flex flex-col gap-4 w-full will-change-transform`}>
                {[...colItems, ...colItems].map((item, i) => (
                  <div key={`${item.id}-${i}`} className="w-full relative group">
                    <div className="w-full aspect-[3/4] overflow-hidden rounded-2xl bg-gray-200 shadow-lg relative">
                      <Image
                        src={item.img}
                        alt="Clinical Result"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MOBILE LAYOUT */}
      {isMobile && (
        <div className="flex flex-col h-full">
          <div className="px-6 pt-12 pb-4 z-30">
            <p className="text-[10px] font-black tracking-[0.4em] text-[#3563A8] uppercase mb-1">Clinical Excellence</p>
            <h1 className="font-serif text-4xl tracking-tighter leading-none text-[#1a1a1a]">
              AESTHETIC<br /><span className="text-[#3563A8] italic font-normal">MASTERY</span>
            </h1>
          </div>

          <div className="relative flex-1 flex items-center overflow-hidden">
            <div className="mobile-track flex gap-4 px-6 will-change-transform">
              {[...columnData.flat(), ...columnData.flat()].map((item, i) => (
                <div key={i} className="w-[80vw] aspect-[4/5] flex-shrink-0">
                  <div className="w-full h-full overflow-hidden rounded-[2rem] bg-gray-200 shadow-xl relative border border-white/20">
                    <Image
                      src={item.img}
                      alt="Smile Result"
                      fill
                      className="object-cover"
                    />
                    {/* All Text Overlays and Gradients Removed */}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="px-8 pb-10 flex justify-between items-center z-30">
            <div className="flex gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3563A8]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#3563A8]/30" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#3563A8]/30" />
            </div>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest text-right">
              Verified Outcomes // Nashik
            </p>
          </div>
        </div>
      )}

      {!isMobile && (
        <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
          <div className="bg-white/80 backdrop-blur-2xl border border-white p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col items-center pointer-events-auto transition-transform hover:scale-105">
            <span className="text-[5px] font-black tracking-[0.6em] text-[#3563A8] uppercase mb-4 opacity-70">
              Clinical Excellence
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#1a1a1a] tracking-tighter leading-none text-center">
              AESTHETIC<br /><span className="text-[#3563A8] italic font-normal">MASTERY</span>
            </h2>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
      `}} />
    </div>
  );
}