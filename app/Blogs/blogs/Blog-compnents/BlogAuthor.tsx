"use client";

import { motion } from "framer-motion";
import { Stethoscope, GraduationCap, MapPin, Star, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const authors = [
  {
    id: "nikhil",
    name: "Dr. Nikhil Abbad",
    degree: "M.D.S., Prosthodontics & Oral Implantology",
    tag: "Gold Medalist",
    role: "Prosthodontist & Implantologist",
    image: "/assets/photo/Nikhil.JPG",
    imagePosition: "md:object-[75%_top] object-center",
    experience: "8+ Years Experience",
    bio: "As the visionary founder of Abbad Dental Clinic, Dr. Nikhil is a Gold Medalist prosthodontist celebrated for his mastery in advanced implantology and complex full-mouth rehabilitations. He blends cutting-edge clinical precision with aesthetic artistry to restore flawless function and craft deeply confident, life-changing smiles.",
    features: [
      "Advanced Prosthodontics",
      "Crown & Bridge",
      "Oral Implants",
      "Digital Smile Design"
    ],
    location: "Nashik"
  },
  {
    id: "leena",
    name: "Dr. Leena Abbad",
    degree: "B.D.S., Dental Surgery",
    tag: "Endodontics Expert",
    role: "Dental Surgeon",
    image: "/assets/photo/leena1.webp",
    imagePosition: "md:object-[85%_top] object-center",
    experience: "4+ Years Experience",
    bio: "As the co-founder of Abbad Dental Clinic, Dr. Leena is an esteemed dental surgeon celebrated for her exceptionally gentle approach to painless, single-visit root canals. With a meticulous eye for smile correction, she seamlessly merges advanced clinical techniques with heartfelt, compassionate care to design truly radiant aesthetics.",
    features: [
      "Single Sitting Root Canals",
      "Painless Dentistry",
      "Smile Correction",
      "Aesthetic Dentistry"
    ],
    location: "Nashik"
  }
];

export default function BlogAuthor() {
  const router = useRouter();

  const handleConsultClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push("/#contact");
    setTimeout(() => {
      const target = document.querySelector("#contact");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      } else {
        // Fallback if we are still on the blog page for some reason or smooth scroll failed
        window.location.href = "/#contact";
      }
    }, 500);
  };

  return (
    <div className="py-1 px-4 md:px-12 w-full max-w-[85rem] mx-auto relative z-10">

      {/* Header */}
      <div className="text-center mb-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-[36px] font-black text-[#0f172a] tracking-tight mb-2">
            Meet Our <span className="text-[#0070f3]">Specialists</span>
          </h2>
          <div className="h-1 w-16 bg-[#0070f3] mx-auto rounded-full" />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {authors.map((author, index) => (
          <motion.div
            key={author.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row bg-white rounded-[1.75rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgb(37,99,235,0.12)] transition-all duration-500 overflow-hidden border border-slate-100"
          >
            {/* Image Section (Left on Desktop, Top on Mobile) */}
            <div className="relative w-full md:w-[42%] shrink-0 h-[350px] md:h-auto bg-[#1e3a5f]">
              <img
                src={author.image}
                alt={author.name}
                className={`absolute inset-0 w-full h-full object-cover ${author.imagePosition}`}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1000&auto=format&fit=crop";
                }}
              />

              {/* Dark overlay at bottom for the badge */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f]/90 via-[#1e3a5f]/20 to-transparent z-10" />

              {/* Badge inside image */}
              <div className="absolute bottom-5 left-5 z-20">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2c4b75]/80 backdrop-blur-md rounded-full border border-white/10 shadow-lg">
                  <div className="bg-yellow-400 p-0.5 rounded-full">
                    <Star size={10} className="text-white fill-white" />
                  </div>
                  <span className="text-[10px] font-bold tracking-widest text-white uppercase">{author.tag}</span>
                </div>
              </div>

              {/* Wavy SVG Divider for Desktop */}
              <svg className="hidden md:block absolute top-0 -right-[1px] h-full w-12 lg:w-16 text-white fill-current z-10 drop-shadow-[-5px_0_15px_rgba(0,0,0,0.05)]" viewBox="0 0 100 800" preserveAspectRatio="none">
                <path d="M100,0 L0,0 C70,266 70,533 0,800 L100,800 Z" />
              </svg>

              {/* Wavy SVG Divider for Mobile */}
              <svg className="block md:hidden absolute -bottom-[1px] left-0 w-full h-8 text-white fill-current z-10 drop-shadow-[0_-5px_15px_rgba(0,0,0,0.05)]" viewBox="0 0 800 100" preserveAspectRatio="none">
                <path d="M0,100 L0,0 C266,70 533,70 800,0 L800,100 Z" />
              </svg>
            </div>

            {/* Content Section */}
            <div className="relative z-10 flex-grow p-5 sm:p-6 md:py-10 md:px-8 xl:px-10 flex flex-col justify-center bg-white">

              <div>
                <h3 className="text-3xl lg:text-[32px] font-serif font-extrabold text-[#0f172a] mb-1.5 leading-tight">
                  {author.name}
                </h3>
                <p className="text-[#0070f3] font-semibold flex items-center gap-1.5 text-sm mb-6">
                  <ShieldCheck size={16} />
                  {author.role}
                </p>

                {/* Degree Box */}
                <div className="flex items-center gap-3 mb-5 bg-[#f8fafc] p-3 rounded-2xl border border-slate-100">
                  <div className="h-10 w-10 rounded-[0.85rem] bg-[#eef2ff] flex items-center justify-center text-[#4f46e5] shrink-0">
                    <GraduationCap size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1e293b] leading-tight mb-1">{author.degree}</p>
                    <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase">{author.experience}</p>
                  </div>
                </div>

                <p className="text-slate-600 text-[13px] sm:text-sm leading-relaxed mb-5 font-medium">
                  {author.bio}
                </p>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                  {author.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-2 rounded-xl shadow-sm w-full h-full">
                      <CheckCircle2 size={14} className="text-[#0070f3] shrink-0" />
                      <span className="text-[11px] sm:text-xs font-bold text-slate-700 leading-tight">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Action */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                <a
                  href="/#contact"
                  onClick={handleConsultClick}
                  className="group/btn inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0070f3] text-white text-[11px] font-black tracking-widest uppercase rounded-full transition-all duration-300 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 cursor-pointer"
                >
                  Consult Now
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </a>

                <div className="flex items-center gap-1.5 text-slate-500 text-xs sm:text-sm font-semibold">
                  <MapPin size={14} />
                  {author.location}
                </div>
              </div>

            </div>

          </motion.div>
        ))}
      </div>
    </div>
  );
}
