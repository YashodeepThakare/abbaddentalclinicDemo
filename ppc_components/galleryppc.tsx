"use client";

import React from "react";
import Image from "next/image";

// --- DATA CONFIGURATION ---
const generateGalleryData = () => {
  return Array.from({ length: 24 }).map((_, i) => ({
    id: i + 1,
    img: `/assets/photo/P${i + 1}.jpg`
  }));
};

export default function DentalShowcase() {
  const galleryItems = generateGalleryData();

  return (
    <section id="gallery" className="bg-black py-16 md:py-24 lg:py-12 text-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-12">
        
        {/* HEADER SECTION - Layout Preserved */}
        <div className="mb-12 md:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-[2px] bg-brand-blue"></span>
            <span className="font-syne text-brand-blue text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">
              Clinical Excellence
            </span>
          </div>
          
          <h2 className="font-syne text-4xl md:text-6xl text-white font-bold leading-none tracking-tighter">
            AESTHETIC <span className="italic font-normal text-brand-blue">MASTERY</span>
          </h2>
          <p className="font-outfit text-slate-400 mt-6 max-w-md text-sm md:text-base leading-relaxed">
            A visual showcase of our verified clinical outcomes and smile transformations delivered with precision.
          </p>
        </div>

        {/* STATIC GRID: 2 Columns Mobile | 3 Columns Tablet | 4 Columns Laptop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {galleryItems.map((item) => (
            // aspect-square container prevents Layout Shift (CLS) on mobile
            <div 
              key={item.id} 
              className="relative aspect-square overflow-hidden rounded-2xl md:rounded-3xl bg-[#121212]"
            >
              <Image
                src={item.img}
                alt={`Transformation ${item.id}`}
                fill
                // Optimized sizes match the grid perfectly to save mobile bandwidth
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover"
                // Lazy loading prevents these 24 images from delaying the Hero LCP
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* FOOTER STRIP - Extra text and dots removed for maximum speed */}
        <div className="mt-16 pt-10 border-t border-white/10" />
      </div>
    </section>
  );
}