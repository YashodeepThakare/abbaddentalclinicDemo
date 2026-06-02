"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ArrowRight, ArrowLeft, Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register Plugin
gsap.registerPlugin(ScrollTrigger);

// --- DATA ---
const awardsData = [
  { id: 1, src: "/assets/photo/awards1.JPG", title: "Health Stalwarts", tag: "Excellence", desc: "Recognized for setting the gold standard in patient safety and clinical hygiene protocols." },
  { id: 2, src: "/assets/photo/awards2.JPG", title: "XL Award", tag: "Leadership", desc: "Awarded for exceptional leadership in community health initiatives and outreach programs." },
  { id: 3, src: "/assets/photo/awards3.jpg", title: "Excellence in Dental", tag: "Clinical", desc: "Celebrating our commitment to advanced surgical procedures and painless dentistry." },
  { id: 4, src: "/assets/photo/awards4.jpg", title: "Best Clinic Design", tag: "Service", desc: "Honored for creating a calming, patient-centric environment that reduces dental anxiety." },
  { id: 5, src: "/assets/photo/awards5.jpg", title: "Community Care", tag: "Social", desc: "For our dedicated service to underprivileged communities through free dental camps." },
  { id: 6, src: "/assets/photo/awards11.JPG", title: "Service Award", tag: "Impact", desc: "A testament to 20 years of continuous, unwavering service to the city." },
  { id: 7, src: "/assets/photo/awards13.jpg", title: "Tech Innovation", tag: "Tech", desc: "Pioneering the use of AI and 3D imaging in daily diagnostic workflows." },
  { id: 8, src: "/assets/photo/awards12.jpg", title: "Leadership Honor", tag: "Honor", desc: "Acknowledging the visionary guidance that drives our medical team forward." },
  { id: 9, src: "/assets/photo/awards14.jpg", title: "XLCon Get Recharge Awards 2023", tag: "Distinction", desc: "Honored at XLCon 2023 for outstanding contributions to dental practice innovation and patient wellness." },
];

// --- HELPER FOR TEXT SPLITTING ---
const SplitText = ({ children, className }: { children: string, className?: string }) => {
  return (
    <span className={className}>
      {children.split('').map((char, i) => (
        <span key={i} className="char inline-block" style={{ whiteSpace: 'pre' }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

export default function AwardsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // --- 1. HANDLE RESIZE ---
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- 2. ENTRANCE ANIMATIONS ---
  useGSAP(() => {
    // Heading Reveal
    gsap.fromTo(".title-char .char", 
      { y: 80, opacity: 0, rotateX: -90 },
      {
        y: 0, opacity: 1, rotateX: 0,
        stagger: 0.02, duration: 1,
        ease: "power4.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 85%" }
      }
    );

    // Description Reveal
    gsap.fromTo(".header-desc",
      { y: 20, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1,
        ease: "power3.out", delay: 0.5,
        scrollTrigger: { trigger: headerRef.current, start: "top 85%" }
      }
    );

    // Stack Container Entrance
    gsap.fromTo(".stack-container",
      { scale: 0.9, opacity: 0, rotateY: 20 },
      {
        scale: 1, opacity: 1, rotateY: 0, duration: 1.5,
        ease: "expo.out",
        scrollTrigger: { trigger: ".stack-container", start: "top 80%" }
      }
    );
  }, { scope: containerRef });

  // --- 3. HANDLE SLIDE CHANGES ---
  const handleSlideChange = useCallback((direction: 'next' | 'prev') => {
    if (isAnimating) return;
    setIsAnimating(true);

    const nextIndex = direction === 'next' 
      ? (activeIndex + 1) % awardsData.length 
      : (activeIndex - 1 + awardsData.length) % awardsData.length;

    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false)
    });

    // Animate text out
    tl.to(".award-content-inner", {
      y: direction === 'next' ? -30 : 30,
      opacity: 0,
      filter: "blur(10px)",
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => setActiveIndex(nextIndex)
    });

    // Animate text in
    tl.fromTo(".award-content-inner", 
      { y: direction === 'next' ? 30 : -30, opacity: 0, filter: "blur(10px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.6, ease: "power3.out" }
    );

    // Subtle "pop" for the image
    tl.fromTo(".active-card", 
      { scale: 0.95, rotate: direction === 'next' ? 2 : -2 },
      { scale: 1, rotate: 0, duration: 0.8, ease: "elastic.out(1, 0.75)" },
      "-=0.6"
    );

  }, [activeIndex, isAnimating]);

  // --- 4. AUTO-PLAY ---
  useEffect(() => {
    const timer = setInterval(() => {
      handleSlideChange('next');
    }, 6000);
    return () => clearInterval(timer);
  }, [handleSlideChange]);

  const getStackIndex = (index: number) => {
    return (index - activeIndex + awardsData.length) % awardsData.length;
  };

  const currentAward = awardsData[activeIndex];

  return (
    <section id='awards' className="w-full bg-[#fdfbf6] py-8 sm:py-20 lg:py-12 px-4 sm:px-10 lg:px-16 overflow-hidden min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Manrope:wght@300;400;600;800&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-manrope { font-family: 'Manrope', sans-serif; }
        .perspective-2000 { perspective: 2000px; }
      `}</style>

      <div ref={containerRef} className="container mx-auto rounded-[2rem] sm:rounded-[4rem] border border-[#D4AF37]/20 p-5 sm:p-12 lg:p-20 relative bg-white shadow-[0_40px_100px_rgba(0,0,0,0.03)]">
        
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-[#D4AF37]/5 blur-[80px] sm:blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        {/* --- HEADER --- */}
        <div ref={headerRef} className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 sm:mb-24 relative z-10">
          <div className="max-w-3xl">
            <div className="overflow-hidden mb-4 flex items-center gap-3">
              <Star size={14} className="text-[#3563A8] fill-[#3563A8]" />
              <span className="badge-text block text-[#3563A8] font-manrope text-[10px] sm:text-sm tracking-[0.4em] uppercase font-bold">
                Excellence & Recognition
              </span>
            </div>

            <h2 className="font-playfair text-2xl sm:text-3xl lg:text-5xl leading-[1] lg:leading-[0.9] text-[#1a1a1a] tracking-tight whitespace-nowrap">
              <span className="title-char inline-flex overflow-hidden py-1 sm:py-2">
                <SplitText>Our Accolades</SplitText>
              </span>
              <span className="mx-3 title-char inline-flex overflow-hidden py-1 sm:py-2 italic text-orange-500">
                <SplitText>and Awards</SplitText>
              </span>
            </h2>
          </div>

          <div className="mt-6 lg:mt-0 lg:max-w-xs header-desc">
             <p className="text-gray-600 font-manrope text-sm sm:text-base leading-relaxed">
               At <span className="text-black font-bold">Abbad Dental Clinic</span>, We are proud to be recognized as <span className="text-black font-bold">Health Stalwarts</span> by Lokmat in 2024 and to have received the <span className="text-black font-bold">XL AWARD</span> by Life XL in 2023.
             </p>
          </div>
        </div>

        {/* --- CONTENT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 relative z-10 items-center">
          
          {/* LEFT: TEXT */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="award-content-inner bg-[#fdfbf6]/50 backdrop-blur-sm p-6 sm:p-10 rounded-[2rem] sm:rounded-3xl border border-white shadow-sm">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <span className="w-6 sm:w-8 h-[2px] bg-[#3563A8]"></span>
                <span className="text-[10px] sm:text-xs font-bold tracking-widest text-[#3563A8] uppercase">
                  Global Recognition
                </span>
              </div>

              <h3 className="font-playfair text-2xl sm:text-4xl lg:text-5xl text-[#1a1a1a] mb-4 sm:mb-6 leading-tight">
                {currentAward.title}
              </h3>
              
              <p className="text-gray-600 font-manrope text-sm sm:text-lg leading-relaxed mb-8 sm:mb-10 min-h-[80px] sm:min-h-[100px]">
                {currentAward.desc}
              </p>

              <div className="flex items-center gap-4 sm:gap-6">
                <div className="flex gap-2 sm:gap-3">
                  <button onClick={() => handleSlideChange('prev')} className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#3563A8] transition-all duration-300 active:scale-95">
                    <ArrowLeft size={18} />
                  </button>
                  <button onClick={() => handleSlideChange('next')} className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1a1a1a] flex items-center justify-center text-white hover:bg-[#3563A8] transition-all duration-300 shadow-xl active:scale-95">
                    <ArrowRight size={18} />
                  </button>
                </div>
                <div className="flex flex-col ml-2">
                   <span className="text-[8px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Index</span>
                   <span className="text-xs sm:text-sm font-bold text-[#1a1a1a]">{activeIndex + 1} / {awardsData.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: PHOTO STACK */}
          <div className="lg:col-span-7 h-[300px] sm:h-[450px] lg:h-[550px] relative perspective-2000 order-1 lg:order-2 mb-4 lg:mb-0">
            <div className="stack-container relative w-full h-full">
              {awardsData.map((award, index) => {
                const stackIndex = getStackIndex(index);
                if (stackIndex > 3) return null;

                const zIndex = 30 - stackIndex * 10;
                const opacity = stackIndex === 0 ? 1 : stackIndex === 1 ? 0.6 : stackIndex === 2 ? 0.3 : 0;
                const scale = 1 - stackIndex * 0.08;
                const rotate = stackIndex * (isMobile ? 2 : 5);
                const translateX = stackIndex * (isMobile ? 12 : 40);
                const translateY = stackIndex * (isMobile ? -8 : -30);

                return (
                  <div
                    key={award.id}
                    className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${stackIndex === 0 ? 'active-card' : ''}`}
                    style={{ 
                      zIndex, 
                      opacity,
                      transform: `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotate}deg) scale(${scale})`,
                      filter: stackIndex > 0 ? 'blur(2px)' : 'none'
                    }}
                  >
                    <div className="w-full h-full bg-white p-2 sm:p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 group relative overflow-hidden">
                      <div className="w-full h-full bg-gray-100 overflow-hidden rounded-xl relative">
                        <img src={award.src} alt={award.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                        <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full">
                           <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                           <span className="text-white text-[8px] sm:text-[10px] font-bold tracking-widest uppercase">Verified</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}