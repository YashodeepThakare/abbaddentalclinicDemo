"use client";

import React from "react";
import { Award, ArrowRight, CheckCircle2, ShieldCheck, Stethoscope } from "lucide-react";
import Image from "next/image";

// Optimized StaticImage: Critical for the 95+ mobile score
const StaticImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
  <div className={`relative overflow-hidden bg-slate-100 ${className}`}>
    <Image
      src={src}
      alt={alt}
      fill
      // priority fixes the 4.7s LCP delay on mobile
      priority 
      fetchPriority="high"
      // sizes helps the browser download a smaller file for phones
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
      className="object-cover"
    />
  </div>
);

export default function About() {
  const images = ["/assets/photo/1.JPG", "/assets/photo/4.JPG", "/assets/photo/6.JPG"];

  return (
    <section id="about" className="relative bg-[#FFFCF8] py-12 md:py-24 lg:py-12 overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-6 md:px-12">
        
        {/* Main Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-10 lg:gap-x-20 items-start">
          
          {/* 1. HEADING - Laptop UI Preserved */}
          <div className="order-1 lg:order-2 lg:col-start-2">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-[2px] bg-[#3563A8]"></span>
              <span className="font-syne text-[#3563A8] text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">
                The Best Dentist in Nashik
              </span>
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl lg:text-3xl text-[#1A1A1A] leading-[1.1]">
              Abbad Dental Clinic 
              <span className="italic text-[#3563A8]"> and  Implant Center</span>
            </h2>
          </div>

          {/* 2. IMAGE SECTION - Badge Removed for Speed */}
          <div className="order-2 lg:order-1 lg:col-start-1 lg:row-span-2 self-center">
            <div className="relative">
              {/* Main Image Frame - Now prioritized for mobile */}
              <div className="relative z-10 rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-[4/5] shadow-2xl border-4 md:border-8 border-white">
                <StaticImage src={images[0]} alt="Abbad Dental Clinic" className="w-full h-full" />
              </div>
              
              {/* Decorative Circle Decoration - Preserved for Design */}
              <div className="hidden lg:block absolute -top-10 -left-10 w-40 h-40 bg-[#3563A8]/5 rounded-full -z-10"></div>
            </div>
          </div>

          {/* 3. CONTENT - Logic & GSAP Compatibility Preserved */}
          <div className="order-3 lg:order-3 lg:col-start-2 mt-2 lg:mt-8 space-y-8">
            <div className="space-y-6">
              <p className="font-inter text-lg text-slate-700 leading-relaxed">
                Welcome to <span className="font-semibold text-[#1A1A1A]">Abbad Dental Clinic and Implant Center</span>, 
                where you will receive care from the best dentist in Nashik. Our clinic is led by the esteemed 
                <span className="text-[#3563A8] font-medium"> Dr. Nikhil Abbad, M.D.S.</span> and 
                <span className="text-[#3563A8] font-medium"> Dr. Leena Abbad, B.D.S.</span>
              </p>

              <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <p className="font-inter text-base text-slate-600 leading-relaxed">
                  We provide comprehensive care for all ages, including full mouth rehabilitation, dental implants, 
                  root canal treatment, and smile designing.
                </p>
                <div className="flex items-center gap-3 pt-2">
                   <div className="w-8 h-8 rounded-full bg-[#FA5424]/10 flex items-center justify-center">
                      <ShieldCheck className="text-[#FA5424] w-4 h-4" />
                   </div>
                   <p className="font-syne text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A]">
                     Advanced CBCT Machine & Digital Procedures
                   </p>
                </div>
              </div>
            </div>

            {/* Action Buttons & Social Proof - Main Hero Logic Untouched */}
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <a 
                href="#contact" 
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-6 bg-[#1A1A1A] text-white px-8 py-5 rounded-full font-syne font-bold uppercase text-[11px] tracking-[0.2em] transition-all hover:bg-[#3563A8]"
              >
                Book Appointment
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <div className="flex items-center gap-3">
                 <div className="flex -space-x-3">
                   {[1, 2, 3].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden relative">
                        <Image src={`/assets/photo/cc${i}.jpg`} alt="Patient" fill className="object-cover" sizes="40px" />
                      </div>
                   ))}
                 </div>
                 <span className="font-inter text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                    Join our happy patients
                 </span>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM SERVICE STRIP - Optimized for Mobile row stability */}
        <div className="mt-20 pt-10 border-t border-slate-200/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Prosthodontics", icon: <Stethoscope size={16} /> },
              { label: "Endodontics", icon: <CheckCircle2 size={16} /> },
              { label: "Oral Implants", icon: <Award size={16} /> },
              { label: "Smile Designing", icon: <ShieldCheck size={16} /> }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 text-[#3563A8]">
                {item.icon}
                <span className="font-syne text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}