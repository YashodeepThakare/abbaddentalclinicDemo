"use client";

import React, { useRef, useState, useEffect } from 'react';
import { ArrowUpRight, X, Award, GraduationCap, Clock, Globe, BookOpen, User, Medal } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// --- TYPES ---
interface Highlight {
  label: string;
  value: string;
  icon: React.ReactNode;
}

interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  title: string;
  subtitle: string;
  image: string;
  detailImage: string;
  shortDesc: string;
  bio: string;
  specialties: string[];
  highlights: Highlight[];
}

// --- DATA ---
const doctors: Doctor[] = [
  {
    id: "01",
    firstName: "Dr. Nikhil",
    lastName: "Abbad",
    fullName: "Dr. Nikhil Abbad",
    title: "Prosthodontist & Implantologist",
    subtitle: "M.D.S. Gold Medalist",
    image: "/assets/photo/nikhil1.webp",
    detailImage: "/assets/photo/Detnikhil.webp",
    shortDesc: "Founder & Implant Specialist. 8+ years redefining smile aesthetics through advanced prosthodontics and implant surgery.",
    bio: "Dr. Nikhil Abbad is a highly accomplished Consultant Prosthodontist with over 8 years of experience, recognized as one of the best dentists in Nashik. Specializing in Crowns, Bridges, and Oral Implants, he has a distinguished educational background with an M.D.S. in Prosthodontics and Oral Implantology. Dr. Nikhil is the founder of Abbad Dental Clinic and Implant Center in Nashik, where he provides expert care in Implant Surgery and Full Mouth Rehabilitation. He is passionate about improving patients' confidence through effective dental treatments.",
    specialties: ["PROSTHODONTICS", "ORAL IMPLANTS", "CROWN & BRIDGE", "FULL MOUTH REHAB"],
    highlights: [
      { label: "Specialty", value: "Prosthodontics, Crown & Bridge, Oral Implantology", icon: <Award size={20} /> },
      { label: "Degrees", value: "M.D.S., Modern Dental College, Indore", icon: <GraduationCap size={20} /> },
      { label: "Experience", value: "Over 8 years in advanced prosthodontics", icon: <Clock size={20} /> },
      { label: "Achievements", value: "Gold Medalist in MDS;  Digital Smile Designing (Univ. of Los Angeles)", icon: <Award size={20} /> },
      { label: "Research", value: "Published international journals; Best paper presentations", icon: <BookOpen size={20} /> },
      { label: "Training", value: "Oral/Maxillofacial prosthetics at TATA Memorial Hospital, Mumbai", icon: <User size={20} /> },
      { label: "Academic Role", value: "Visiting Assistant Professor, SMBT Sangamner", icon: <Globe size={20} /> },
    ]
  },
  {
    id: "02",
    firstName: "Dr. Leena",
    lastName: "Abbad",
    fullName: "Dr. Leena Abbad",
    title: "Dental Surgeon",
    subtitle: "B.D.S. Dental Surgeon",
    image: "/assets/photo/leena1.webp",
    detailImage: "/assets/photo/Detleena.webp",
    shortDesc: "Expert in painless root canals and artistic smile design. Combining technical precision with aesthetic enhancement.",
    bio: "Dr. Leena Abbad is a skilled Dental Surgeon with extensive expertise in Endodontics and Restorative Dentistry. Graduating with a B.D.S. from Pravara Institute of Medical Sciences, Loni, she has garnered over 4 years of experience. Renowned for her proficiency in painless single-sitting root canals and her keen eye for smile correction and design. As co-founder of Abbad Dental Clinic, she combines deep technical skills to deliver exceptional aesthetic enhancements.",
    specialties: ["DENTAL SURGERY", "ENDODONTICS", "SMILE DESIGN", "RESTORATIVE DENTISTRY"],
    highlights: [
      { label: "Specialty", value: "Dental Surgery, Endodontics", icon: <Award size={20} /> },
      { label: "Degrees", value: "B.D.S., Pravara Institute of Medical Sciences, Loni", icon: <GraduationCap size={20} /> },
      { label: "Experience", value: "Over 4 years at Aastha Dental Hospital & Microscopic Root Canal center", icon: <Clock size={20} /> },
      { label: "Expertise", value: "Single Sitting/Painless Root Canals, Smile Design", icon: <User size={20} /> },
      { label: "Training", value: "International 3D Cleaning Congress, Congress on Stem Cells", icon: <BookOpen size={20} /> },
      { label: "Affiliation", value: "Member, Indian Dental Association, Nashik Chapter", icon: <Globe size={20} /> },
    ]
  }
];

export default function DoctorsSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  // --- IMAGE PRELOADING ---
  useEffect(() => {
    doctors.forEach((doc) => {
      const img = new Image();
      img.src = doc.detailImage;
    });
  }, []);

  // --- ANIMATION LOGIC (GSAP) ---
  useGSAP(() => {
    if (!containerRef.current || !trackRef.current) return;

    const slides = gsap.utils.toArray('.doctor-slide');
    
    let mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 1024px)",
      isMobile: "(max-width: 1023px)"
    }, (context) => {
      const { isDesktop } = context.conditions as any;

      if (isDesktop) {
        const track = trackRef.current!;
        const getScrollAmount = () => track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${getScrollAmount()}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.round(self.progress * (slides.length - 1)) + 1;
              setCurrentIndex(idx);
            }
          }
        });
      } else {
        slides.forEach((slide: any) => {
          gsap.fromTo(slide, { opacity: 0, y: 40 }, {
            opacity: 1, y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: slide,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          });
        });
      }
    });

    return () => mm.revert();
  }, { scope: containerRef });

  const closeModal = () => setSelectedDoctor(null);

  return (
    <section id='doctors' className="relative w-full bg-black text-[#F5F2EB] overflow-x-hidden font-sans">
      <style dangerouslySetInnerHTML={{ __html: `
        .shiny-text {
          background: linear-gradient(to right, #3563A8 20%, #85A8D6 30%, #FFFFFF 50%, #85A8D6 70%, #3563A8 80%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 500% auto;
          animation: shine 6s ease-in-out infinite alternate;
        }
        .shiny-gold {
          background: linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% auto;
          animation: shine 4s linear infinite;
        }
        @keyframes shine {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* HIDDEN PRELOADER */}
      <div className="sr-only" aria-hidden="true">
        {doctors.map(doc => (
          <img key={doc.id} src={doc.detailImage} alt="preloading" />
        ))}
      </div>

      <div ref={containerRef} className="relative w-full">
        {/* Progress Indicator */}
        <div className="hidden lg:block absolute bottom-12 left-16 z-40 pointer-events-none">
          <div className="flex items-center gap-4">
            <span className="text-sm font-mono tracking-widest text-[#F5F2EB]">
              [ {String(currentIndex).padStart(2, '0')} / {String(doctors.length).padStart(2, '0')} ]
            </span>
            <div className="w-[20vw] h-px bg-[#F5F2EB] opacity-30"></div>
          </div>
        </div>

        {/* --- DESKTOP TRACK --- */}
        <div ref={trackRef} className="hidden lg:flex flex-nowrap h-screen w-fit will-change-transform">
          {doctors.map((doc) => (
            <div key={doc.id} className="doctor-slide h-screen w-screen flex-shrink-0 relative border-r border-white/10">
              <div className="w-full h-full max-w-[1600px] mx-auto grid grid-cols-12 gap-12 p-20 items-center">
                <div className="col-span-4 h-full flex flex-col justify-center">
                  <span className="text-xs font-bold tracking-[0.2em] uppercase opacity-40 mb-4 font-mono">Doctor {doc.id}</span>
                  
                  {doc.subtitle.toLowerCase().includes('gold medalist') && (
                    <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 w-fit">
                      <Medal size={16} className="text-yellow-400" />
                      <span className="text-[10px] font-bold uppercase tracking-widest shiny-gold">MDS Gold Medalist</span>
                    </div>
                  )}

                  <h1 className="shiny-text text-[6rem] xl:text-[8rem] font-bold leading-[0.85] tracking-tighter mb-8">
                    {doc.fullName}
                  </h1>
                </div>

                <div className="col-span-4 h-[75vh] w-full relative overflow-hidden rounded-3xl group cursor-pointer" onClick={() => setSelectedDoctor(doc)}>
                  <img 
                    src={doc.image} 
                    alt={doc.fullName} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                <div className="col-span-4 h-full flex flex-col justify-center pl-8">
                  <div className="space-y-4 mb-10">
                    {doc.specialties.map((spec, i) => (
                      <div key={i} className="border-b border-white/10 pb-2">
                        <span className="text-xs tracking-widest uppercase text-white/60 font-medium">{spec}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-lg font-light leading-relaxed opacity-70 mb-8 max-w-sm">{doc.shortDesc}</p>
                  <button onClick={() => setSelectedDoctor(doc)} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest hover:text-white transition-all group">
                    View Full Profile 
                    <ArrowUpRight size={18} className="text-[#3563A8] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- MOBILE LIST --- */}
        <div className="lg:hidden block py-20 px-6">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">Our Experts</span>
            <h2 className="shiny-text text-4xl font-bold mt-2">World-Class Dentists</h2>
          </div>

          {doctors.map((doc) => (
            <div key={doc.id} className="doctor-slide mb-20 last:mb-0">
              <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-6 shadow-2xl">
                 <div onClick={() => setSelectedDoctor(doc)} className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden mb-8">
                    <img src={doc.image} alt={doc.fullName} className="w-full h-full object-cover" />
                 </div>

                 {doc.subtitle.toLowerCase().includes('gold medalist') && (
                    <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 w-fit">
                      <Medal size={14} className="text-yellow-400" />
                      <span className="text-[10px] font-bold uppercase tracking-widest shiny-gold">MDS Gold Medalist</span>
                    </div>
                  )}

                 <h3 className="text-3xl font-bold text-white mb-2">{doc.fullName}</h3>
                 <p className="text-sm text-[#B8B5AE] uppercase tracking-widest mb-6 font-medium">{doc.title}</p>
                 <button onClick={() => setSelectedDoctor(doc)} className="w-full py-5 bg-[#F5F2EB] text-black font-black text-xs uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-transform">
                    View Detailed Profile <ArrowUpRight size={16} />
                 </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- DOCTOR DETAIL MODAL --- */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-[100] h-screen w-full overflow-y-auto no-scrollbar bg-black animate-in fade-in slide-in-from-bottom-8 duration-500">
            <button onClick={closeModal} className="fixed top-6 right-6 lg:top-10 lg:right-10 z-[110] p-4 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-colors">
                <X size={28} className="text-white" />
            </button>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
                <div className="lg:col-span-5 h-[50vh] lg:h-screen sticky top-0 bg-neutral-900">
                    <img 
                      src={selectedDoctor.detailImage} 
                      alt={selectedDoctor.fullName} 
                      className="w-full h-full object-cover" 
                      loading="eager" 
                      fetchPriority="high"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent lg:hidden"></div>
                </div>
                
                <div className="lg:col-span-7 p-8 lg:p-24 bg-black flex flex-col justify-center">
                    <div className="mb-10">
                        {selectedDoctor.subtitle.toLowerCase().includes('gold medalist') && (
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 mb-6">
                                <Medal size={16} className="text-yellow-400" />
                                <span className="text-[10px] font-black uppercase tracking-widest shiny-gold">MDS Gold Medalist</span>
                            </div>
                        )}
                        <span className="text-[#3563A8] text-xs font-bold uppercase tracking-[0.3em] block mb-3">{selectedDoctor.title}</span>
                        <h2 className="text-5xl lg:text-8xl font-bold text-white leading-[0.9] tracking-tighter mb-6">{selectedDoctor.fullName}</h2>
                        <div className="h-1 w-24 bg-[#3563A8]"></div>
                    </div>

                    <p className="text-xl text-white/70 font-light leading-relaxed mb-16 max-w-2xl">
                        {selectedDoctor.bio}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 border-t border-white/10 pt-12">
                        {selectedDoctor.highlights.map((item, idx) => (
                            <div key={idx} className="flex gap-5 items-start">
                                <div className="p-3.5 bg-white/5 rounded-2xl text-[#3563A8] shadow-inner">
                                    {item.icon}
                                </div>
                                <div className="flex flex-col">
                                    <h4 className="text-[10px] uppercase font-black tracking-[0.2em] text-white/40 mb-1.5">{item.label}</h4>
                                    <p className="text-sm text-white/90 font-medium leading-snug">{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      )}
    </section>
  );
}