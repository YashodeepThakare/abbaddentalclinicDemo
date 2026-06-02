"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Plus, ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import Link from 'next/link';
// Note: 'next/image' is replaced with standard 'img' to avoid environment resolution issues.
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- OPTIMIZED TYPING TEXT (High Performance) ---
const TypingText = ({ children, className = "", delay = 0 }: { children: string; className?: string; delay?: number }) => {
  const characters = children.split("").map((char) => (char === " " ? "\u00A0" : char));

  return (
    <div className={cn("inline-flex flex-wrap font-serif", className)}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        aria-label={children}
      >
        {characters.map((char, index) => (
          <motion.span
            key={index}
            className="inline-block"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { delay: delay + index * 0.02, duration: 0.2 } }
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    </div>
  );
};

const TREATMENTS = [
  { title: "Dental Implants", slug: "dental-implants", description: "Restore your smile with durable and natural-looking dental implants.", image: "/assets/photo/qDental Implants.png" },
  { title: "Crowns & Bridges", slug: "crowns-and-bridges", description: "Enhance your smile with custom crowns and bridges that fit seamlessly.", image: "/assets/photo/qCrowns & Bridges.png" },
  { title: "Tooth Extraction", slug: "tooth-extraction", description: "Experience a comfortable and safe tooth extraction process.", image: "/assets/photo/qTooth Extraction.png" },
  { title: "Pediatric Dentistry", slug: "pediatric-dentistry", description: "Ensure your child's dental health with gentle, specialized care.", image: "/assets/photo/qpediatic.png" },
  { title: "Braces & Aligners", slug: "braces-and-aligners", description: "Achieve a straighter smile with our advanced braces and aligners.", image: "/assets/photo/qBraces.png" },
  { title: "RCT (Root Canal)", slug: "root-canal-treatment", description: "Relieve pain and save your tooth with our gentle root canal treatment.", image: "/assets/photo/qrct.png" },
  { title: "Teeth Whitening", slug: "teeth-whitening", description: "Brighten your smile with fast and effective professional whitening.", image: "/assets/photo/qteethwhitening.png" },
  { title: "Dental Veneers", slug: "dental-veneers", description: "Transform your smile with custom veneers for a flawless look.", image: "/assets/photo/qdentalveeners.png" },
  { title: "Full Mouth Reconstruction", slug: "full-mouth-reconstruction", description: "Rebuild and enhance your smile with a personalized reconstruction plan.", image: "/assets/photo/qmouthrecos.png" }
];

export default function Treatments() {
  const [activeTreatment, setActiveTreatment] = useState(TREATMENTS[0]);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(TREATMENTS[0].title);
  const [showAllMobile, setShowAllMobile] = useState(false);

  const mobileTreatments = showAllMobile ? TREATMENTS : TREATMENTS.slice(0, 5);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) {
      const currentIndex = TREATMENTS.findIndex(t => t.title === activeTreatment.title);
      const nextIndex = info.offset.x < 0
        ? (currentIndex + 1) % TREATMENTS.length
        : (currentIndex - 1 + TREATMENTS.length) % TREATMENTS.length;
      setActiveTreatment(TREATMENTS[nextIndex]);
      setExpandedMobile(TREATMENTS[nextIndex].title);
    }
  };

  return (
    <section id='treatments' className="relative min-h-screen bg-[#FAF7F2] text-black py-5 lg:py-14 px-4 lg:px-12 flex items-center overflow-hidden">

      <div className="max-w-[1400px] mx-auto w-full relative z-10">

        {/* MOBILE LAYOUT */}
        <div className="lg:hidden flex flex-col">
          <div className="mb-6 order-1">
            <TypingText className="text-2xl sm:text-3xl font-medium mb-3">The Art of Luxurious Dentistry</TypingText>
            <p className="text-black/70">Unparalleled Care for Those Who Expect the Best</p>
          </div>

          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            className="order-2 relative aspect-[4/3] mb-6 rounded-[20px] overflow-hidden shadow-xl bg-slate-200"
          >
            <AnimatePresence mode="wait">
              <motion.div key={activeTreatment.image} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative w-full h-full">
                <img
                  src={activeTreatment.image}
                  alt={activeTreatment.title}
                  className="absolute inset-0 w-full h-full object-cover grayscale"
                  loading="eager"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <div className="order-3 mb-8 pl-4 border-l-2 border-[#FA5424]">
            <AnimatePresence mode="wait">
              <motion.div key={activeTreatment.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <h3 className="text-xl font-bold font-serif mb-2 text-[#3563A8]">{activeTreatment.title}</h3>
                <p className="text-black/70 text-sm leading-relaxed mb-3">{activeTreatment.description}</p>
                <Link
                  href={`/services/${activeTreatment.slug}`}
                  className="inline-flex items-center gap-1.5 text-[#FA5424] font-semibold text-xs hover:underline cursor-pointer group/link"
                >
                  Explore Details
                  <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="order-4 space-y-2">
            {mobileTreatments.map((item) => (
              <MobileAccordionItem
                key={item.title}
                item={item}
                isExpanded={expandedMobile === item.title}
                onToggle={() => { setExpandedMobile(item.title); setActiveTreatment(item); }}
              />
            ))}
            {!showAllMobile && (
              <button onClick={() => setShowAllMobile(true)} className="w-full mt-4 py-4 bg-black text-white rounded-xl flex items-center justify-center gap-2 font-bold hover:bg-[#FA5424] transition-colors">
                Explore More Treatments <Plus size={20} className="text-[#FA5424]" />
              </button>
            )}
          </div>
        </div>

        {/* DESKTOP LAYOUT */}
        <div className="hidden lg:grid grid-cols-2 gap-24 items-center">
          <div className="flex flex-col">
            <TypingText className="text-4xl font-medium mb-4 leading-tight">The Art of Luxurious Dentistry</TypingText>
            <p className="text-xl text-black/70 mb-16">Unparalleled Care for Those Who Expect the Best</p>

            <div className="grid grid-cols-2 gap-x-12">
              <div className="flex flex-col">
                {TREATMENTS.slice(0, 5).map((item, idx) => (
                  <ServiceItem key={item.title} item={item} idx={idx} setActive={setActiveTreatment} isActive={activeTreatment.title === item.title} />
                ))}
              </div>
              <div className="flex flex-col">
                {TREATMENTS.slice(5, 9).map((item, idx) => (
                  <ServiceItem key={item.title} item={item} idx={idx + 5} setActive={setActiveTreatment} isActive={activeTreatment.title === item.title} />
                ))}
              </div>
            </div>

            <a
              href="#contact"
              aria-label="Book appointment"
              className="mt-16 group flex items-center gap-2 text-sm font-bold tracking-widest uppercase border-b-2 border-black w-fit pb-1 hover:text-[#FA5424] hover:border-[#FA5424] transition-all cursor-pointer"
            >
              Book Appointment <ArrowRight className="w-4 h-4 text-[#FA5424] group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="flex flex-col items-center">
            {/* Hexagon Frame */}
            <div className="relative w-full max-w-xl aspect-[4/3] shadow-2xl overflow-hidden hexagon-clip bg-slate-200">
              <AnimatePresence mode="wait">
                <motion.div key={activeTreatment.image} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="relative w-full h-full">
                  <img
                    src={activeTreatment.image}
                    alt={activeTreatment.title}
                    className="absolute inset-0 w-full h-full object-cover grayscale"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Active Treatment Info with Orange Border */}
            <div className="mt-8 pl-4 border-l-2 border-[#FA5424] w-full max-w-xl">
              <AnimatePresence mode="wait">
                <motion.div key={activeTreatment.title} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={16} className="text-[#FA5424]" />
                    <h3 className="text-xl font-bold font-serif text-[#3563A8]">{activeTreatment.title}</h3>
                  </div>
                  <p className="text-black/70 text-base leading-relaxed mb-4">{activeTreatment.description}</p>
                  <Link
                    href={`/services/${activeTreatment.slug}`}
                    className="inline-flex items-center gap-2 text-[#FA5424] font-medium text-sm hover:underline cursor-pointer group/link"
                  >
                    Learn More
                    <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .hexagon-clip {
          clip-path: polygon(20% 0%, 100% 0%, 100% 100%, 20% 100%, 0% 50%);
          border-radius: 20px;
        }
      `}</style>
    </section>
  );
}

function ServiceItem({ item, idx, setActive, isActive }: any) {
  return (
    <Link href={`/services/${item.slug}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: idx * 0.05 }}
        onMouseEnter={() => setActive(item)}
        className={cn(
          "py-5 border-b flex justify-between items-center cursor-pointer transition-all duration-300 group",
          isActive ? "border-[#FA5424] translate-x-2" : "border-black/20 hover:border-[#3563A8]/30"
        )}
      >
        <div className="flex items-center gap-3">
          {/* Active Orange Dot */}
          <div className={cn("w-1.5 h-1.5 rounded-full bg-[#FA5424] transition-all duration-300", isActive ? "opacity-100 scale-100" : "opacity-0 scale-0")} />
          <span className={cn("text-xl transition-all", isActive ? "font-medium text-[#3563A8]" : "font-normal text-black/70 group-hover:text-black")}>
            {item.title}
          </span>
        </div>
        <Plus className={cn("w-5 h-5 transition-all", isActive ? "rotate-90 text-[#FA5424] opacity-100" : "opacity-0")} />
      </motion.div>
    </Link>
  );
}

function MobileAccordionItem({ item, isExpanded, onToggle }: any) {
  return (
    <div className={cn(
      "border rounded-xl overflow-hidden bg-white/50 mb-2 transition-all",
      isExpanded ? "border-[#FA5424]/30 bg-white" : "border-black/10"
    )}>
      <button onClick={onToggle} aria-expanded={isExpanded} className="w-full flex justify-between items-center p-4 text-left group">
        <span className={cn("text-base transition-all", isExpanded ? "font-bold text-[#3563A8]" : "text-black/70")}>{item.title}</span>
        <ChevronDown className={cn("transition-transform duration-300", isExpanded ? "rotate-180 text-[#FA5424]" : "text-black/30")} />
      </button>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden px-4 pb-4">
            <p className="text-sm text-black/70 leading-relaxed border-t border-black/5 pt-3 mb-3">{item.description}</p>
            <Link
              href={`/services/${item.slug}`}
              className="inline-flex items-center gap-1.5 text-[#FA5424] font-semibold text-xs hover:underline cursor-pointer group/link"
            >
              Explore {item.title}
              <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}