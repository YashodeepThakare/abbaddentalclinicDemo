"use client";

import React, { useRef } from 'react';
import { Award, Star, ArrowRight, Globe, Layers, Sparkles } from 'lucide-react';
import { motion, useInView as useFramerInView } from 'framer-motion';
import Image from 'next/image'; 
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// --- UTILITY ---
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(" ");

// --- OPTIMIZED IMAGE COMPONENT ---
const OptimizedImage = ({ src, alt, className, priority = false }: { src: string; alt: string; className?: string; priority?: boolean }) => {
  return (
    <div className={cn("relative overflow-hidden bg-slate-200 w-full h-full", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </div>
  );
};

// --- PERFORMANCE TYPING ANIMATION ---
const TypingText = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useFramerInView(ref, { once: true, margin: "-10%" });

  useGSAP(() => {
    if (!ref.current || !isInView) return;
    
    // Prevent duplicate splitting on re-renders
    if (ref.current.getAttribute('data-split')) return;
    
    const textStr = ref.current.textContent || "";
    ref.current.innerHTML = textStr.split('').map(char => 
      `<span class="char opacity-0 inline-block">${char === ' ' ? '\u00A0' : char}</span>`
    ).join('');
    ref.current.setAttribute('data-split', 'true');

    const chars = ref.current.querySelectorAll('.char');
    gsap.to(chars, {
      opacity: 1,
      duration: 0.05,
      stagger: 0.02,
      delay,
      ease: 'none'
    });
  }, { dependencies: [isInView], scope: ref });

  return <h2 ref={ref} className={className}>{text}</h2>;
};

export default function About() {
  const containerRef = useRef(null);
  const images = ["/assets/photo/1.JPG", "/assets/photo/4.JPG", "/assets/photo/6.JPG"];

  return (
    <section id="about" ref={containerRef} className="relative z-10 bg-[#FFFCF8] text-slate-900 py-10 md:py-14 lg:py-14 overflow-hidden">
      
      {/* BG GLOWS */}
      <div className="absolute top-[-5%] right-[-5%] w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-[#FA5424]/5 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-[#3563A8]/5 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />

      {/* BACKGROUND TEXT */}
      <div className="absolute top-10 lg:top-20 left-0 w-full overflow-hidden pointer-events-none select-none opacity-[0.02]">
         <div className="text-[20vw] lg:text-[20rem] font-black whitespace-nowrap -ml-10 lg:-ml-20 tracking-tighter">
            ABBAD DENTAL
         </div>
      </div>

      <div className="max-w-[90rem] mx-auto px-5 md:px-12 lg:px-16 relative z-10">
        
        {/* MAIN GRID */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-20">
          
          {/* HEADING */}
          <div className="order-1 mb-1 md:mb-1 lg:mb-1">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <span className="h-[2px] w-8 md:w-12 bg-[#3563A8]"></span>
              <span className="h-[5px] w-[5px] md:h-[6px] md:w-[6px] rounded-full bg-[#FA5424]"></span>
              <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-slate-500">About Us</span>
            </div>

  <TypingText
  text="Abbad Dental Clinic"
  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
  delay={0.1}
/>

<TypingText
  text="& Implant Center"
  className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#3563A8]"
  delay={0.4}
/>


          </div>

          {/* GALLERY */}
          <div className="order-2 mb-10 md:mb-12 lg:mb-0 lg:row-span-2">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 h-full">
                <div className="relative h-[240px] md:h-[280px] lg:h-[380px] rounded-2xl overflow-hidden shadow-xl md:shadow-2xl group">
                  <OptimizedImage src={images[0]} alt="Clinic Reception" priority />
                </div>
                <div className="relative h-[240px] md:h-[280px] lg:h-[380px] rounded-2xl overflow-hidden shadow-xl md:shadow-2xl group">
                  <OptimizedImage src={images[1]} alt="Dental Equipment" />
                  <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-slate-900 text-white p-3 md:p-4 rounded-xl z-20 shadow-2xl border-l-4 border-[#FA5424]">
                    <div className="flex items-center gap-2">
                      <Award className="text-[#3563A8] w-4 h-4 md:w-5 md:h-5" /> 
                      <span className="font-bold text-sm md:text-base">#1 Clinic</span>
                    </div>
                  </div>
                </div>
                <div className="relative h-[200px] md:h-[250px] md:col-span-2 rounded-2xl overflow-hidden shadow-xl md:shadow-2xl group">
                  <OptimizedImage src={images[2]} alt="Patient Care" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                  <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-20 text-white">
                    <p className="text-[8px] md:text-[10px] uppercase font-bold tracking-widest mb-1 md:mb-2 flex items-center gap-2">
                      <Sparkles size={10} className="text-[#FA5424]" />
                      Premium Care
                    </p>
                    <h4 className="text-xl md:text-2xl font-bold">Excellence in Every Smile</h4>
                  </div>
                </div>
             </div>
          </div>

          {/* ABOUT CONTENT */}
          <div className="order-3 mb-10 md:mb-16 lg:mb-0 lg:pr-10">
            <div className="space-y-4 md:space-y-6 text-base md:text-lg text-slate-600 leading-relaxed mb-8 md:mb-10">
              <p>Welcome to Abbad Dental Clinic and Implant Center. Our clinic is led by the esteemed <strong className="text-[#3563A8]">Dr. Nikhil Abbad, M.D.S.</strong> and <strong className="text-[#3563A8]">Dr. Leena Abbad, B.D.S.</strong></p>
              <p>We provide comprehensive care including dental implants, root canal treatments, and digital smile designing with advanced CBCT technology. At our dental clinic in Nashik, we provide comprehensive care for all ages, ensuring a comfortable and enjoyable experience. Our services include full mouth rehabilitation, dental implants, root canal treatment, dental veneers, digital smile designing, crowns & bridges, and braces. Contact us today to schedule your appointment and take the first step towards a healthier, more beautiful smile.</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8">
              <a href="#contact" className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 bg-slate-900 text-white px-8 md:px-10 py-4 md:py-5 font-bold uppercase text-xs md:text-sm transition-all hover:bg-[#3563A8] shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#FA5424] transition-all group-hover:w-2" />
                <span className="relative z-10">Book Consultation</span>
                <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
              </a>

              <div className="flex items-center gap-4 w-full sm:w-auto justify-center sm:justify-start">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#FFFCF8] bg-slate-200 overflow-hidden relative shadow-md hover:z-10 transition-transform hover:scale-110">
                      <Image
                        src={`/assets/photo/cc${i}.jpg`}
                        alt={`Patient testimonial ${i}`}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-sm font-semibold text-slate-900">
                  <span className="block text-sm md:text-base text-[#FA5424]">20k+ Patients</span>
                  <span className="text-slate-500 font-normal text-[10px] md:text-xs uppercase tracking-tighter">Trust our care</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* STATS GRID */}
        <div className="order-4 max-w-6xl mx-auto pt-6 md:pt-7 border-t border-slate-200 mt-10 md:mt-16 lg:mt-32">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
             <StatItem icon={Globe} val="20K+" label="Verified Smiles" delay={0.1} />
             <StatItem icon={Award} val="16+" label="Years Exp" delay={0.2} />
             <StatItem icon={Layers} val="1K+" label="Implants" delay={0.3} />
             <StatItem icon={Star} val="4.9" label="Rating" delay={0.4} />
          </div>
        </div>

      </div>
    </section>
  );
}

// STAT COMPONENT
function StatItem({ icon: Icon, val, label, delay }: any) {
    const ref = useRef(null);
    useGSAP(() => {
        gsap.from(ref.current, { 
          opacity: 0, 
          y: 20, 
          delay, 
          scrollTrigger: { trigger: ref.current, start: "top 95%" } 
        });
    }, { scope: ref });

    return (
        <div ref={ref} className="group bg-white border border-slate-200 p-4 md:p-6 lg:p-8 hover:shadow-2xl transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 w-8 h-8 md:w-12 md:h-12 bg-[#FA5424]/5 rounded-bl-full translate-x-2 -translate-y-2 md:translate-x-4 md:-translate-y-4 group-hover:translate-x-0 group-hover:-translate-y-0 transition-transform duration-500" />
            
            <div className="text-[#3563A8] mb-2 md:mb-4 group-hover:text-[#FA5424] transition-colors duration-300">
              <Icon size={20} className="md:w-6 md:h-6" />
            </div>
            <div className="text-2xl md:text-3xl lg:text-5xl font-bold text-slate-900 mb-1">{val}</div>
            <div className="text-[8px] md:text-[10px] uppercase font-bold tracking-widest text-slate-500 group-hover:text-[#FA5424] transition-colors">{label}</div>
        </div>
    );
}