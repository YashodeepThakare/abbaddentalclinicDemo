"use client";

import React from "react";
import Image from "next/image";

const TREATMENTS = [
  { title: "Root Canal Treatment", description: "Say goodbye to tooth pain with gentle root canal care. Save your natural tooth and smile without discomfort.", image: "/assets/photo/qrct.png" },
  { title: "Dental Implants", description: "Missing tooth? Get a permanent, natural-looking replacement. Eat, speak, and smile with full confidence again.", image: "/assets/photo/qDental Implants.png" },
  { title: "Dental Veneers", description: "Transform your smile with wafer-thin, natural-looking shells. A quick way to fix stains, gaps, or uneven teeth.", image: "/assets/photo/qdentalveeners.png" },
  { title: "Crowns & Bridges", description: "Enhance your smile with custom crowns and bridges that fit seamlessly and restore function.", image: "/assets/photo/qCrowns & Bridges.png" },
  { title: "Tooth Extraction", description: "Experience a comfortable and safe tooth extraction process with our expert surgical team.", image: "/assets/photo/qTooth Extraction.png" },
  { title: "Pediatric Dentistry", description: "Ensure your child's dental health with gentle, specialized care in a fun and friendly environment.", image: "/assets/photo/qpediatic.png" },
  { title: "Braces & Aligners", description: "Achieve a straighter, healthier smile with our advanced orthodontic braces and clear aligners.", image: "/assets/photo/qBraces.png" },
  { title: "Teeth Whitening", description: "Brighten your smile significantly with our fast, safe, and effective professional whitening treatments.", image: "/assets/photo/qteethwhitening.png" },
  { title: "Full Mouth Reconstruction", description: "Rebuild and enhance your entire smile with a personalized, comprehensive reconstruction plan.", image: "/assets/photo/qmouthrecos.png" }
];

export default function Treatments() {
  return (
    <section id="treatments" className="bg-[#F1EFE8] py-12 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* HEADER - Preserved Design */}
        <div className="text-center mb-16">
          <h2 className="font-syne text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
            Experience Our <span className="italic font-normal text-[#3563A8]">Treatments</span>
          </h2>
          <div className="w-16 h-[2px] bg-[#3563A8] mx-auto"></div>
        </div>

        {/* 3x3 GRID - Optimized for Responsive Performance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {TREATMENTS.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              
              {/* Image Container with Rounded Style */}
              <div className="relative w-full aspect-[1.1/1] mb-6 rounded-[32px] overflow-hidden bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100 p-2">
                <div className="relative w-full h-full rounded-[24px] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    // Optimized sizes: Prevents downloading oversized images on mobile
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                    // Defer loading for below-the-fold content to keep Hero LCP fast
                    loading="lazy" 
                  />
                </div>
              </div>

              {/* Text Content - Preserved UI */}
              <div className="px-4">
                <h3 className="font-syne font-bold text-sm md:text-base uppercase tracking-[0.15em] text-[#1A1A1A] mb-3">
                  {item.title}
                </h3>
                <p className="font-inter text-sm text-slate-500 leading-relaxed max-w-[280px] mx-auto">
                  {item.description}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}