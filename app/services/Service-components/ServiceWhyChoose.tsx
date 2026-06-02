"use client";

import React, { useState, useEffect } from "react";
import { Star, ShieldCheck, Award, Cpu, HeartHandshake, Sparkles } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const slideshowImages = [
  "/SericeImages/CommonImg/1.JPG",
  "/SericeImages/CommonImg/2.png",
  "/SericeImages/CommonImg/3.JPG",
  "/SericeImages/CommonImg/4.JPG",
  "/SericeImages/CommonImg/5.png",
  "/SericeImages/CommonImg/6.JPG",
  "/SericeImages/CommonImg/7.png",
];

interface ServiceWhyChooseProps {
  whyChooseUs: string[];
  title?: string;
}

export default function ServiceWhyChoose({
  whyChooseUs = [],
  title
}: ServiceWhyChooseProps) {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prevIdx) => (prevIdx + 1) % slideshowImages.length);
    }, 4500); // Cycles every 4.5 seconds
    return () => clearInterval(timer);
  }, []);

  const clinicHighlights = [
    {
      icon: <Award className="w-5 h-5 text-[#FA5424]" />,
      title: "MDS Specialist Team",
      desc: "Led by MDS Gold Medalist Dr. Nikhil Abbad & Dr. Leena Abbad."
    },
    {
      icon: <Cpu className="w-5 h-5 text-[#3563A8]" />,
      title: "Advanced Digital Tech",
      desc: "In-house CBCT 3D scans, digital radiography, and intraoral scans."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#FA5424]" />,
      title: "Class B Sterilization",
      desc: "Strict hygiene protocols exceeding international standards."
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-[#3563A8]" />,
      title: "Comfort-First Focus",
      desc: "Gentle techniques and custom pain management."
    }
  ];

  return (
    <section className="py-8 sm:py-10 md:py-12 px-4 md:px-8 lg:px-12 bg-transparent">
      <div className="max-w-[1200px] mx-auto space-y-8 md:space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#3563A8]/5 border border-[#3563A8]/10 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#3563A8]" />
            <span className="text-[#3563A8] text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-wider font-outfit">Why Choose Us</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-playfair text-slate-900 leading-tight">
            <a
              href="/#home"
              className="hover:underline decoration-[#3563A8]/30 underline-offset-4 transition-all cursor-pointer"
            >
              Why Choose <span className="text-[#3563A8]">Abbad Dental Clinic?</span>
            </a>
          </h2>
          <p className="text-slate-600 font-outfit text-base md:text-lg">
            We deliver treatment-specific precision backed by international clinical standards.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Text Content Grid */}
          <div className="lg:col-span-7 xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Treatment-Specific Column */}
            <div className="bg-white p-6 md:p-8 lg:p-10 rounded-3xl border border-slate-100/80 shadow-sm space-y-4 md:space-y-5 h-full flex flex-col">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 font-playfair border-b border-slate-200/50 pb-3">
                Advantages For <span className="text-[#3563A8]">{title || "This Treatment"}</span>
              </h3>
              <div className="space-y-4 flex-grow">
                {whyChooseUs.map((reason, index) => (
                  <div key={index} className="flex gap-4 items-start group">
                    <div className="w-8 h-8 rounded-full bg-[#FA5424]/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#FA5424] transition-colors duration-300">
                      <Star className="w-4 h-4 text-[#FA5424] group-hover:text-white transition-colors duration-300" fill="currentColor" />
                    </div>
                    <p className="text-sm md:text-base text-slate-700 font-medium font-outfit leading-relaxed pt-0.5 md:pt-1 group-hover:text-slate-900 transition-colors">
                      {reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* General Clinic Highlights Column */}
            <div className="bg-slate-900 text-white p-6 md:p-8 lg:p-10 rounded-3xl shadow-lg space-y-4 md:space-y-5 h-full flex flex-col">
              <h3 className="text-xl md:text-2xl font-bold font-playfair border-b border-white/10 pb-3">
                Our Clinic <span className="text-[#3563A8]">Standards</span>
              </h3>
              <div className="grid grid-cols-1 gap-6 flex-grow">
                {clinicHighlights.map((item, index) => (
                  <div key={index} className="space-y-2 p-3.5 md:p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold font-outfit text-white text-base md:text-lg">{item.title}</h4>
                      <p className="text-white/70 font-outfit text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Slideshow */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-32 space-y-4 max-w-sm md:max-w-md mx-auto lg:max-w-none w-full">
            <div className="relative aspect-square md:aspect-[3/4] w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-100 bg-slate-900 group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIdx}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={slideshowImages[currentIdx]}
                    alt={`Clinical Standard - ${currentIdx + 1}`}
                    fill
                    className="object-cover"
                    priority={currentIdx === 0}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Indicators */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
                {slideshowImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIdx(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer shadow-[0_2px_4px_rgba(0,0,0,0.4)] ${currentIdx === idx ? "bg-[#FA5424] w-6" : "bg-white/80 hover:bg-white"
                      }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
