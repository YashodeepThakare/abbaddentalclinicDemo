"use client";

import Image from "next/image";
import { Calendar, Sparkles } from "lucide-react";

interface ServiceHeroProps {
  slug?: string;
  title: string;
  heroTagline: string;
  shortDescription: string;
  image: string;
}

const SERVICE_HIGHLIGHTS: Record<
  string,
  Array<{ title: string; desc: string; iconColor: string }>
> = {
  "dental-implants": [
    { title: "Fixed Tooth Support", desc: "Replaces missing teeth permanently", iconColor: "#3563A8" },
    { title: "3D CBCT Guided", desc: "Bone height & width evaluation", iconColor: "#FA5424" },
    { title: "Bite & Chew Comfort", desc: "Restores natural chewing balance", iconColor: "#22C55E" },
  ],
  "crowns-and-bridges": [
    { title: "Prosthodontist Led", desc: "Expertly crafted dental fittings", iconColor: "#3563A8" },
    { title: "CAD/CAM Restorations", desc: "Precision-milled zirconia & ceramic", iconColor: "#FA5424" },
    { title: "Bite & Strength", desc: "Restores power to weakened teeth", iconColor: "#22C55E" },
  ],
  "tooth-extraction": [
    { title: "Surgical Precision", desc: "Gentle extraction with minimal trauma", iconColor: "#3563A8" },
    { title: "Digital Pre-evaluation", desc: "X-rays map root & bone structure", iconColor: "#FA5424" },
    { title: "Comfort & Recovery", desc: "Guided aftercare for smooth healing", iconColor: "#22C55E" },
  ],
  "pediatric-dentistry": [
    { title: "Child-Friendly Care", desc: "Warm, non-intimidating atmosphere", iconColor: "#3563A8" },
    { title: "Preventive Focus", desc: "Fluoride applications & cavity sealants", iconColor: "#FA5424" },
    { title: "Caring Team", desc: "Building positive habits for life", iconColor: "#22C55E" },
  ],
  "braces-and-aligners": [
    { title: "Clear Aligners", desc: "Discreet invisible teeth alignment", iconColor: "#3563A8" },
    { title: "3D Smile Simulation", desc: "Visualize final results beforehand", iconColor: "#FA5424" },
    { title: "Custom Orthodontics", desc: "For children, teens, and adults", iconColor: "#22C55E" },
  ],
  "root-canal-treatment": [
    { title: "Single-Sitting RCT", desc: "Available for many clinical cases", iconColor: "#3563A8" },
    { title: "Rotary Endodontics", desc: "Faster, more precise canal cleaning", iconColor: "#FA5424" },
    { title: "Save Natural Tooth", desc: "Relieves deep pain & prevents extraction", iconColor: "#22C55E" },
  ],
  "teeth-whitening": [
    { title: "Single-Visit Results", desc: "Visible brightening in one office visit", iconColor: "#3563A8" },
    { title: "Enamel-Safe Care", desc: "Clinically approved whitening agents", iconColor: "#FA5424" },
    { title: "Gum Protection", desc: "Controlled barriers prevent irritation", iconColor: "#22C55E" },
  ],
  "dental-veneers": [
    { title: "Flawless Makeover", desc: "Transform chips, cracks & spacing", iconColor: "#3563A8" },
    { title: "Digital Smile Design", desc: "Proportion mapping & mock-up trial", iconColor: "#FA5424" },
    { title: "Premium Porcelain", desc: "Stain-resistant, thin ceramic shells", iconColor: "#22C55E" },
  ],
  "full-mouth-reconstruction": [
    { title: "Full Rehabilitation", desc: "Coordinated prosthodontic execution", iconColor: "#3563A8" },
    { title: "3D CBCT Analysis", desc: "Full-arch jaw & bite relation check", iconColor: "#FA5424" },
    { title: "Functional Restorations", desc: "Combines implants, crowns & veneers", iconColor: "#22C55E" },
  ],
};

const DEFAULT_HIGHLIGHTS = [
  { title: "M.D.S. Specialist", desc: "Expert clinical guidance & care", iconColor: "#3563A8" },
  { title: "Advanced Tech", desc: "3D CBCT scans & digital planning", iconColor: "#FA5424" },
  { title: "Painless Care", desc: "Comfort-focused dental care", iconColor: "#22C55E" },
];

export default function ServiceHero({ slug, title, heroTagline, shortDescription, image }: ServiceHeroProps) {
  // Smooth scroll handler for the Explore button
  const handleScrollToProcedure = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const procedureEl = document.getElementById("procedure");
    if (procedureEl) {
      procedureEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const highlights = (slug && SERVICE_HIGHLIGHTS[slug]) || DEFAULT_HIGHLIGHTS;

  return (
    <div className="relative w-full min-h-[100svh] lg:h-screen lg:min-h-[600px] bg-slate-900 overflow-hidden flex flex-col justify-between">
      {/* Background Image with layered gradient overlays for a premium cinematic look */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover opacity-65 mix-blend-overlay scale-105 animate-[subtle-zoom_20s_infinite_alternate]"
          priority
        />
      </div>

      {/* Sleek Gradient Overlays for maximum text readability and depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 z-10"></div>

      {/* Top Spacer for fixed navbar */}
      <div className="h-[80px] md:h-[100px] z-20"></div>

      {/* Main Content Area */}
      <div className="relative z-20 max-w-[1400px] w-full mx-auto px-4 md:px-12 flex-grow flex items-center py-8 lg:py-0">
        <div className="max-w-3xl">
          {/* Animated Glassmorphic Tagline */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 md:py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-4 md:mb-6 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FA5424] animate-[pulse_2s_infinite]"></span>
            <span className="text-white text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.2em] font-outfit">{heroTagline}</span>
          </div>

          {/* Premium Typography Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white font-playfair mb-4 md:mb-6 leading-[1.1] tracking-tight">
            {title}
          </h1>

          {/* Service Short Description */}
          <p className="text-base sm:text-lg md:text-xl text-white/80 font-outfit leading-relaxed max-w-2xl mb-6 md:mb-10">
            {shortDescription}
          </p>

          {/* Call To Actions */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-6 w-full">
            <a
              href={`/#contact`}
              className="w-full sm:w-auto justify-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#FA5424] hover:bg-[#FA5424]/90 text-white font-bold uppercase tracking-wider text-xs md:text-sm flex items-center gap-2 shadow-[0_8px_30px_rgb(250,84,36,0.3)] hover:shadow-[0_8px_35px_rgb(250,84,36,0.5)] transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4" />
              Book Appointment
            </a>

            <a
              href="#procedure"
              onClick={handleScrollToProcedure}
              className="w-full sm:w-auto justify-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold uppercase tracking-wider text-xs md:text-sm border border-white/20 hover:border-white/40 backdrop-blur-sm transition-all duration-300 flex items-center gap-2"
            >
              Explore Treatment
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Area: Highlight USPs */}
      <div className="relative z-20 max-w-[1400px] w-full mx-auto px-4 md:px-12 pb-8 md:pb-12">
        {/* Clinical Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 w-full md:w-auto md:max-w-4xl">
          {highlights.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 bg-black/35 backdrop-blur-sm border border-white/5 p-4 rounded-xl">
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${item.iconColor}20`, color: item.iconColor }}
              >
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-white font-bold text-xs md:text-sm uppercase tracking-wider">{item.title}</h4>
                <p className="text-white/60 text-xs mt-1 font-outfit">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes subtle-zoom {
          0% { transform: scale(1.05); }
          100% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}
