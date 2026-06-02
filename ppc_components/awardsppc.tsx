"use client";

import React, { useEffect, useRef } from "react";
import { Star, Trophy } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";

const awardsData = [
  { id: 1, src: "/assets/photo/awards1.JPG", title: "Health Stalwarts", desc: "Recognized for setting the gold standard in patient safety and clinical hygiene protocols." },
  { id: 2, src: "/assets/photo/awards2.JPG", title: "XL Award", desc: "Awarded for exceptional leadership in community health initiatives and outreach programs." },
  { id: 3, src: "/assets/photo/awards3.jpg", title: "Excellence in Dental", desc: "Celebrating our commitment to advanced surgical procedures and painless dentistry." },
  { id: 4, src: "/assets/photo/awards4.jpg", title: "Best Clinic Design", desc: "Honored for creating a calming, patient-centric environment that reduces dental anxiety." },
  { id: 5, src: "/assets/photo/awards5.jpg", title: "Community Care", desc: "For our dedicated service to underprivileged communities through free dental camps." },
  { id: 6, src: "/assets/photo/awards11.JPG", title: "Service Award", desc: "A testament to 20 years of continuous, unwavering service to the city." },
  { id: 7, src: "/assets/photo/awards13.jpg", title: "Tech Innovation", desc: "Pioneering the use of AI and 3D imaging in daily diagnostic workflows." },
  { id: 8, src: "/assets/photo/awards12.jpg", title: "Leadership Honor", desc: "Acknowledging the visionary guidance that drives our medical team forward." },
];

export default function AwardsSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!trackRef.current) return;

      gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 40, 
        ease: "none",
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="awards" className="bg-[#fdfbf6] py-12 md:py-14 overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        
        {/* --- HEADER --- */}
        <div className="px-6 md:px-12 lg:px-20 mb-8 md:mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Star size={14} className="text-brand-blue fill-brand-blue" />
            <span className="font-syne text-brand-blue text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase">
              Excellence & Recognition
            </span>
          </div>

          <h2 className="font-playfair text-[28px] md:text-4xl lg:text-5xl text-[#1A1A1A] leading-tight tracking-tight">
            Our Accolades <span className="italic text-brand-blue">and Prestigious Awards</span>
          </h2>
        </div>

        {/* --- CAROUSEL TRACK --- */}
        <div className="flex overflow-visible pointer-events-none"> 
          <div 
            ref={trackRef} 
            className="flex gap-4 md:gap-6 pr-4 md:pr-6 whitespace-nowrap"
          >
            {[...awardsData, ...awardsData].map((award, index) => (
              <div 
                key={`${award.id}-${index}`} 
                className="flex-shrink-0 w-[260px] md:w-[320px] lg:w-[350px]" 
              >
                <div className="bg-white rounded-[24px] md:rounded-[32px] p-3 md:p-4 border border-[#D4AF37]/10 shadow-[0_10px_40px_rgba(0,0,0,0.03)] h-full whitespace-normal">
                  
                  {/* Aspect Ratio Box prevents CLS during carousel movement */}
                  <div className="relative aspect-square rounded-[18px] md:rounded-[24px] overflow-hidden mb-5 bg-slate-100">
                    <Image 
                      src={award.src} 
                      alt={award.title} 
                      fill 
                      className="object-cover"
                      // Optimization: Prevents downloading 1000px images for 260px carousel cards
                      sizes="(max-width: 768px) 260px, (max-width: 1024px) 320px, 350px"
                      // Since this is a horizontal track, standard lazy loading protects initial Hero speed
                      loading="lazy"
                    />
                  </div>

                  {/* Content */}
                  <div className="px-1 md:px-2 pb-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy size={16} className="text-brand-blue" />
                      <h3 className="font-playfair text-lg md:text-2xl text-[#1A1A1A] font-bold">
                        {award.title}
                      </h3>
                    </div>
                    <p className="font-outfit text-[11px] md:text-sm text-slate-500 leading-relaxed">
                      {award.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}