"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowUpRight, 
  Instagram, 
  Facebook, 
  Youtube, 
  MapPin,
  Linkedin,
  Twitter
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Pinterest = ({ size = 18 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M8 20c.5-1.1.7-2.3.8-3.5a13 13 0 0 1 0-4.5C8 8.6 10 7 12 7a5 5 0 0 1 5 5 9 9 0 0 1-1.3 4.6c-1.2 2-3.4 3-5 3a2.5 2.5 0 0 1-2.4-2.2"/><circle cx="12" cy="12" r="10"/><path d="M12 7v5"/>
  </svg>
);

// --- TYPES ---
declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

// --- UTILITY: DYNAMIC SCRIPT LOADER ---
const loadScript = (src: string): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    if (typeof document === 'undefined') return resolve();
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
};

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);
  const magneticRefs = useRef<(HTMLElement | null)[]>([]);
  const [libsReady, setLibsReady] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const socialLinks = [
    { Icon: Instagram, href: "https://www.instagram.com/abbaddentalclinic/", label: "Instagram" },
    { Icon: Facebook, href: "https://www.facebook.com/abbaddentalclinicnashik/", label: "Facebook" },
    { Icon: Youtube, href: "https://www.youtube.com/@abbaddentalclinicnashik", label: "Youtube" },
    { Icon: Linkedin, href: "https://www.linkedin.com/company/abbad-dental-clinic-and-implant-center/", label: "LinkedIn" },
    { Icon: Pinterest, href: "https://in.pinterest.com/abbaddentalclinic/", label: "Pinterest" },
    { Icon: Twitter, href: "https://x.com/ACenter75541", label: "Twitter" }
  ];

  useEffect(() => {
    const initGSAP = async () => {
      try {
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js");
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js");
        
        if (window.gsap && window.ScrollTrigger) {
          window.gsap.registerPlugin(window.ScrollTrigger);
          setLibsReady(true);
        }
      } catch (err) {
        console.error("GSAP Loading failed.", err);
      }
    };
    initGSAP();
  }, []);

  useEffect(() => {
    if (!libsReady) return;

    const gsap = window.gsap;
    const ctx = gsap.context(() => {
      if (stampRef.current) {
        gsap.to(stampRef.current, {
          rotate: 360,
          duration: 15,
          repeat: -1,
          ease: "none",
        });
      }

      magneticRefs.current.forEach((el) => {
        if (!el) return;
        const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });

        el.addEventListener("mousemove", (e: MouseEvent) => {
          const { width, height, left, top } = el.getBoundingClientRect();
          const x = e.clientX - (left + width / 2);
          const y = e.clientY - (top + height / 2);
          xTo(x * 0.35);
          yTo(y * 0.35);
        });

        el.addEventListener("mouseleave", () => {
          xTo(0);
          yTo(0);
        });
      });

      gsap.from(".reveal-item", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        }
      });
    }, footerRef);

    return () => ctx.revert();
  }, [libsReady]);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Treatments", href: "#treatments" },
    { name: "Doctors", href: "#doctors" },
    { name: "Gallery", href: "#gallery" },
    { name: "Awards", href: "#awards" }
  ];

  const isBlogPage = mounted && pathname?.toLowerCase().includes('/blogs');
  const footerBg = isBlogPage ? 'bg-transparent' : 'bg-[#F2F0E9]';
  const isHome = !mounted || pathname === "/";

  return (
    <footer ref={footerRef} className={`relative w-full ${footerBg} text-[#1A1A1A] font-sans overflow-hidden`}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@300;400;600&display=swap');
        .font-syne { font-family: 'Syne', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .skew-box { clip-path: polygon(0 8%, 100% 0, 100% 100%, 0% 100%); }
        @media (max-width: 768px) { .skew-box { clip-path: none; } }
      `}} />

      {/* --- CTA SECTION --- */}
      <div className="container mx-auto px-6 pt-24 pb-16 flex flex-col items-center text-center">
        <div className="reveal-item flex items-center gap-2 bg-black/5 px-4 py-1.5 rounded-full mb-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 font-inter">Premium Dental Care</span>
        </div>

        <h2 className="reveal-item font-syne text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.9] mb-12 uppercase">
          Precision <span className="text-[#3563A8]">Care.</span><br/>
          Artistic <span className="italic text-[#FA5424]">Vision.</span>
        </h2>

        <div className="flex justify-center w-full">
          <div ref={el => { magneticRefs.current[0] = el; }} className="reveal-item">
            <Link 
              href={isHome ? "#contact" : "/#contact"} 
              className="inline-block w-full sm:w-auto group relative px-10 py-5 rounded-full font-bold border border-black overflow-hidden hover:text-white transition-all duration-500 text-center"
            >
              <span className="relative z-10 flex items-center justify-center gap-3 uppercase text-[11px] tracking-widest font-inter">
                Book Appointment <ArrowUpRight size={16}/>
              </span>
              <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </Link>
          </div>
        </div>
      </div>

      {/* --- FOOTER MAIN --- */}
      <div className="relative mt-10">
        <div ref={stampRef} className="absolute right-12 top-0 z-30 w-36 h-36 hidden lg:block pointer-events-none transform-gpu will-change-transform">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs><path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" /></defs>
            <text className="font-syne font-bold uppercase text-[9px] fill-[#3563A8]/40">
              <textPath xlinkHref="#circlePath">• ABBAD DENTAL CLINIC • ABBAD DENTAL CLINIC •</textPath>
            </text>
            <circle cx="50" cy="50" r="12" fill="#FA5424" />
          </svg>
        </div>

        <div className="footer-inner bg-[#E9E6DC] skew-box pt-40 pb-12 border-t border-black/5">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 relative z-20">
            
            <div className="lg:col-span-4 reveal-item">
              <p className="text-black/50 text-sm leading-relaxed max-w-xs mb-8 font-inter">
                Transforming Nashik's smiles with MDS Gold Medalist expertise and artistic precision.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((link, i) => (
                  <div key={i} ref={el => { magneticRefs.current[i + 1] = el; }}>
                    <a 
                      href={link.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full border border-black/5 bg-white/40 flex items-center justify-center hover:bg-[#3563A8] hover:text-white transition-all"
                      aria-label={link.label}
                    >
                      <link.Icon size={18} />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3 reveal-item">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/30 mb-8 font-inter">Directory</h4>
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={isHome ? link.href : "/" + link.href} className="font-syne text-2xl font-bold uppercase hover:text-[#3563A8] transition-colors">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5 reveal-item">
              <div className="flex items-center gap-2 mb-4 text-[#3563A8]">
                <MapPin size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest font-inter">College Road</span>
              </div>
              <p className="text-black/50 text-m leading-relaxed mb-4 font-inter">2-3, Jubiliant Heights, near Nirman House, Vidya Vikas Circle, towards College road, Nashik, Maharashtra 422005</p>
              <a href="tel:+919713435111" className="text-[#FA5424] font-bold text-m font-inter">+91 97134 35111</a>
            </div>
          </div>

          {/* --- UPDATED BOTTOM BAR --- */}
          <div className="container mx-auto px-6 mt-16 pt-8 border-t border-black/5 flex justify-center">
            <a 
              href="https://www.mastermindweb.in/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex flex-col items-center gap-4 transition-transform hover:scale-105"
            >
              <span className="text-[10px] font-bold text-black/40 tracking-[0.3em] uppercase font-inter text-center leading-tight">
                Designed by <br className="sm:hidden" /> Mastermind Web Developers
              </span>
              <div className="h-14 md:h-16 w-auto">
                <img 
                  src="/assets/photo/mastermind.png" 
                  alt="Mastermind Web Developers" 
                  className="h-full w-auto object-contain"
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}