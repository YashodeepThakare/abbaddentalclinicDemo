"use client";

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const doctors = [
  { id: 1, name: "Dr. Chetan Ahire", role: "MDS Endodontist", specialty: "Associate Dentist", image: "/assets/photo/chetan1.jpg" },
  { id: 2, name: "Dr. Sayali Gangurde", role: "General Dentistry", specialty: "Associate Dentist", image: "/assets/photo/sayali2.jpg" },
  { id: 3, name: "Dr. Akshada Wagh", role: "General Dentistry", specialty: "Associate Dentist", image: "/assets/photo/akshada3.jpg" },
  { id: 4, name: "Dr. Prathmesh Kapoor", role: "Oral & Maxillofacial", specialty: "Surgeon Consultant", image: "/assets/photo/prathmesh4.webp" },
  { id: 5, name: "Dr. Amit Agrawal", role: "Periodontist", specialty: "Consultant", image: "/assets/photo/amit5.webp" },
  { id: 6, name: "Dr. Khusboo Patel", role: "Pedodontist", specialty: "Consultant", image: "/assets/photo/khushboo6.webp" },
  { id: 7, name: "Dr. Aditi Bulbule", role: "Pediatric Dentist", specialty: "Consultant", image: "/assets/photo/aditi7.webp" },
];

export default function AssociateDoctors() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Swipe Tracking
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const loopedDoctors = [...doctors, ...doctors];

  const getGapSize = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return 24; 
    return 48; 
  };

  const slideTo = (index: number) => {
    if (!containerRef.current || !containerRef.current.children[0]) return;
    
    const targetIndex = index >= doctors.length ? 0 : index < 0 ? doctors.length - 1 : index;
    const item = containerRef.current.children[0] as HTMLElement;
    const gapSize = getGapSize();
    
    const moveAmount = targetIndex * (item.offsetWidth + gapSize);

    gsap.to(containerRef.current, {
      x: -moveAmount,
      duration: 0.5,
      ease: "power2.out"
    });
    setActiveIndex(targetIndex);
  };

  // --- MOBILE SWIPE HANDLERS ---
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      slideTo(activeIndex + 1);
    } else if (isRightSwipe) {
      slideTo(activeIndex - 1);
    }

    // Reset values
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div id="associate-doctors" className="bg-[#FBFBF9] overflow-hidden py-10 lg:py-16 font-sans relative select-none">
      
      {/* Header */}
      <div className="px-6 md:px-16 lg:px-24 mb-10">
        <h4 className="text-[#FA5424] font-bold uppercase tracking-[0.4em] text-[10px] mb-3">Associate Specialists</h4>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#1A1A1A] tracking-tighter leading-none">
          Architects of <span className="italic font-serif text-[#3563A8] font-normal">Superior Smiles.</span>
        </h2>
      </div>

      {/* Main Carousel Area */}
      <div 
        className="px-6 md:px-16 lg:px-24 relative touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          ref={containerRef} 
          className="flex gap-6 md:gap-12 w-max items-start" 
        >
          {loopedDoctors.map((doc, idx) => (
            <div 
              key={`${doc.id}-${idx}`}
              onClick={() => slideTo((idx % doctors.length))}
              className="gallery-item shrink-0 w-[calc(100vw-48px)] md:w-52 lg:w-44 group cursor-pointer"
            >
              {/* Image Frame */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#F0EFE9] transition-all duration-500 group-hover:shadow-xl border border-black/5">
                <img 
                  src={doc.image} 
                  alt={doc.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                  draggable="false"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
              </div>

              {/* Info Label */}
              <div className="mt-4 flex flex-col items-center text-center px-1">
                
                {/* Dot + Name */}
                <div className="flex items-center justify-center gap-1.5 mb-0.5">
                  <div className={`w-1.5 h-1.5 rounded-full bg-[#FA5424] shrink-0 transition-all duration-500 ${
                    activeIndex === (idx % doctors.length) ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                  }`} />
                  <h4 className="text-[#1A1A1A] text-[13px] md:text-sm font-bold tracking-tight whitespace-nowrap">
                    {doc.name}
                  </h4>
                </div>
                
                {/* Role and Specialty (Single Line) */}
                <p className="text-[#1A1A1A]/70 text-[10px] md:text-xs font-semibold uppercase tracking-wide whitespace-nowrap">
                  {doc.role}
                </p>
                <p className="text-[#3563A8] text-[10px] md:text-xs font-medium italic whitespace-nowrap">
                  ({doc.specialty})
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center items-center gap-2 md:gap-3 mt-10 md:mt-14">
        {doctors.map((_, idx) => (
          <button
            key={idx}
            onClick={() => slideTo(idx)}
            className={`h-2 rounded-full transition-all duration-500 ${
              activeIndex === idx 
              ? "w-8 md:w-10 bg-[#FA5424]" 
              : "w-2 md:w-2.5 bg-[#1A1A1A]/10 hover:bg-[#1A1A1A]/30"
            }`}
          />
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@1,400&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}} />
    </div>
  );
}