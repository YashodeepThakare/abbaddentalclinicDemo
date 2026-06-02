"use client";

import React from "react";
import { Plus, Medal } from "lucide-react";
import Image from "next/image";

const doctors = [
  {
    id: "01",
    label: "Master of Smiles",
    fullName: "Dr. Nikhil Abbad",
    isGoldMedalist: true,
    subtitle: "MDS - PROSTHODONTIST & IMPLANTOLOGIST",
    image: "/assets/photo/nikhil1.webp",
    bio: "Dr. Nikhil Abbad is a highly accomplished Consultant Prosthodontist with over 8 years of experience, recognized as one of the best dentists in Nashik. Specializing in Crowns, Bridges, and Oral Implants, he has a distinguished educational background with an M.D.S. in Prosthodontics and Oral Implantology.",
    bio2: "He is the founder of Abbad Dental Clinic and Implant Center in Nashik, where he provides expert care in Implant Surgery and Full Mouth Rehabilitation. He is passionate about improving patients' confidence through effective dental treatments.",
    features: [
      "8+ YEARS CLINICAL MASTERY",
      "VISITING ASST. PROFESSOR",
      "FULL MOUTH REHAB SPECIALIST",
      "MDS GOLD MEDALIST"
    ]
  },
  {
    id: "02",
    label: "Precision Specialist",
    fullName: "Dr. Leena Abbad",
    isGoldMedalist: false,
    subtitle: "BDS - ENDODONTIST & COSMETIC DENTIST",
    image: "/assets/photo/leena1.webp",
    bio: "Dr. Leena Abbad is a skilled Dental Surgeon with extensive expertise in Endodontics and Restorative Dentistry. Graduating with a B.D.S. from Pravara Institute of Medical Sciences, Loni, she has garnered over 4 years of experience.",
    bio2: "Renowned for her proficiency in painless single-sitting root canals and her keen eye for smile correction and design. As co-founder of Abbad Dental Clinic, she combines deep technical skills to deliver exceptional aesthetic enhancements.",
    features: [
      "4+ YEARS CLINICAL MASTERY",
      "PAINLESS RCT SPECIALIST",
      "SMILE DESIGN EXPERT",
      "COSMETIC DENTISTRY EXPERT"
    ]
  }
];

export default function DoctorsSection() {
  return (
    <section id="doctors" className="bg-[#FFFCF8] py-16 lg:py-14 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {doctors.map((doc, index) => {
          const isEven = index % 2 === 0;
          return (
            <div 
              key={doc.id} 
              className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${index === 0 ? 'mb-24 lg:mb-20' : ''}`}
            >
              {/* IMAGE CONTAINER */}
              <div className={`w-full lg:w-1/2 order-1 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl border border-slate-100 bg-slate-100">
                  <Image 
                    src={doc.image} 
                    alt={doc.fullName} 
                    fill 
                    className="object-cover"
                    // Fix: Set priority for the first doctor to improve mobile FCP/LCP
                    priority={index === 0}
                    fetchPriority={index === 0 ? "high" : "low"}
                    // Fix: Refined sizes to prevent downloading high-res desktop files on 4G
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {doc.isGoldMedalist && (
                    <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md border border-yellow-500/30 px-5 py-2.5 rounded-full flex items-center gap-2 shadow-xl z-20">
                      <Medal size={18} className="text-yellow-600" />
                      <span className="font-syne text-[11px] font-extrabold text-yellow-700 uppercase tracking-[0.15em]">
                        MDS Gold Medalist
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* CONTENT CONTAINER */}
              <div className={`w-full lg:w-1/2 order-2 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="flex flex-col">
                  <span className="font-playfair italic text-[#3563A8] text-2xl lg:text-3xl mb-4 block">
                    {doc.label}
                  </span>
                  
                  <h2 className="font-syne text-4xl sm:text-5xl lg:text-7xl font-bold text-[#1A1A1A] mb-4 tracking-tighter lg:whitespace-nowrap">
                    {doc.fullName}
                  </h2>
                  
                  <p className="font-syne text-[#3563A8] font-bold text-xs lg:text-sm tracking-[0.25em] mb-10 uppercase">
                    {doc.subtitle}
                  </p>
                  
                  <div className="space-y-6 mb-12">
                    <p className="font-inter text-slate-600 leading-relaxed text-base lg:text-lg">
                      {doc.bio}
                    </p>
                    <p className="font-inter text-slate-600 leading-relaxed text-base lg:text-lg">
                      {doc.bio2}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8 pt-8 border-t border-slate-200">
                    {doc.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Plus size={18} className="text-[#3563A8] flex-shrink-0" />
                        <span className="font-syne font-bold text-[10px] lg:text-[11px] text-[#1A1A1A] tracking-[0.2em] uppercase">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      </div>
    </section>
  );
}