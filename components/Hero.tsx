"use client";

import React, { useRef, useState, useEffect } from "react";
import { Play, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AbbadHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Animation Refs
  const preloaderContainerRef = useRef<HTMLDivElement>(null);
  const shutterTopRef = useRef<HTMLDivElement>(null);
  const shutterBottomRef = useRef<HTMLDivElement>(null);
  const preloaderTextRef = useRef<HTMLHeadingElement>(null);
  const blurOverlayRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const svgCircleRef = useRef<SVGCircleElement>(null);
  const playIconRef = useRef<HTMLDivElement>(null);

  // Reloads video on resize so Chrome Inspect tool switches sources instantly
  useEffect(() => {
    const handleResize = () => {
      if (videoRef.current) {
        videoRef.current.load();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useGSAP(() => {
    const requiredRefs = [
      shutterTopRef.current,
      shutterBottomRef.current,
      preloaderTextRef.current,
      heroContentRef.current,
      line1Ref.current,
      line2Ref.current,
    ];
    
    if (requiredRefs.some((r) => !r)) return;

    const fastSplit = (el: HTMLElement | null): Element[] => {
      if (!el) return []; 
      if (el.getAttribute("data-split")) {
        return Array.from(el.querySelectorAll("span > span"));
      }
      const text = el.textContent || "";
      el.innerHTML = text
        .split("")
        .map((char) => `
          <span style="display:inline-block;overflow:hidden;vertical-align:top;">
            <span style="display:inline-block;transform:translateY(115%)">
              ${char === " " ? "&nbsp;" : char}
            </span>
          </span>`).join("");
      
      el.setAttribute("data-split", "true");
      return Array.from(el.querySelectorAll("span > span"));
    };

    const preloaderChars = fastSplit(preloaderTextRef.current);
    const mainChars1 = fastSplit(line1Ref.current);
    const mainChars2 = fastSplit(line2Ref.current);

    gsap.set(svgCircleRef.current, { strokeDasharray: 302, strokeDashoffset: 302 });
    gsap.set(heroContentRef.current, { opacity: 0 });

    const tl = gsap.timeline();
    tl.to(preloaderChars, { y: "0%", duration: 0.7, stagger: 0.02, ease: "power4.out" })
      .to(preloaderTextRef.current, { opacity: 0, scale: 1.1, duration: 0.4, delay: 0.2 })
      .to(shutterTopRef.current, { yPercent: -100, duration: 1.1, ease: "expo.inOut" }, "-=0.2")
      .to(shutterBottomRef.current, { yPercent: 100, duration: 1.1, ease: "expo.inOut" }, "<")
      .to(blurOverlayRef.current, { backdropFilter: "blur(0px)", backgroundColor: "rgba(0,0,0,0)", duration: 1 }, "-=0.8")
      .set(heroContentRef.current, { opacity: 1 }, "-=1")
      .to([...mainChars1, ...mainChars2], { y: "0%", duration: 0.8, stagger: 0.01, ease: "power3.out" }, "-=0.6")
      .to(svgCircleRef.current, { strokeDashoffset: 0, duration: 0.8 }, "-=0.4")
      .from(playIconRef.current, { scale: 0, opacity: 0, duration: 0.4 }, "-=0.4")
      .set(preloaderContainerRef.current, { display: "none" });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        gsap.set(heroContentRef.current, {
          y: -100 * self.progress,
          opacity: 1 - self.progress,
        });
      },
    });
  }, { scope: containerRef });

  return (
    <div id="home" ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">
      
      {/* BACKGROUND VIDEO */}
      <div className="absolute inset-0 w-full h-full z-0 select-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/assets/photo/video-poster.webp"
          className="w-full h-full object-cover opacity-80"
        >
          <source src="/assets/video/hero_3.mp4" type="video/mp4" media="(min-width: 769px)" />
          <source src="/assets/video/hero_mobile.mp4" type="video/mp4" />
        </video>
      </div>

      {/* PRELOADER */}
      <div ref={preloaderContainerRef} className="absolute inset-0 z-[60] pointer-events-none">
        <div ref={shutterTopRef} className="absolute top-0 left-0 w-full h-[50vh] bg-[#0a0a0a] border-b border-white/10" />
        <div ref={shutterBottomRef} className="absolute bottom-0 left-0 w-full h-[50vh] bg-[#0a0a0a] border-t border-white/10" />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <h2 ref={preloaderTextRef} className="text-white font-playfair text-lg md:text-4xl tracking-widest uppercase text-center px-4">
            Abbad Dental Clinic
          </h2>
        </div>
      </div>

      <div ref={blurOverlayRef} className="absolute inset-0 z-20 pointer-events-none bg-black/40 backdrop-blur-[20px]" />

      {/* HERO CONTENT */}
      {/* pb-[18vh] is the mobile height. 
          It's a little lower than the previous 25vh. 
      */}
      <div ref={heroContentRef} className="absolute bottom-0 left-0 z-30 w-full px-6 pb-[18vh] sm:pb-20 md:px-20 lg:pb-28">
        <div className="max-w-[1400px] mx-auto">
          <h1 ref={line1Ref} className="text-white font-playfair text-[9vw] sm:text-[7vw] md:text-[5vw] leading-[1.1] tracking-tight mb-1">
            Transforming
          </h1>
          
          <div className="flex items-center gap-4 sm:gap-8 flex-nowrap">
            <h1 ref={line2Ref} className="text-white font-playfair text-[9.5vw] sm:text-[9vw] md:text-[5vw] leading-[1] tracking-tight italic whitespace-nowrap">
              Dental Care
            </h1>
            
            <button
              onClick={() => setIsVideoOpen(true)}
              className="flex-shrink-0 w-12 h-12 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-full cursor-pointer z-40 flex items-center justify-center relative group pointer-events-auto transition-transform hover:scale-105 active:scale-95"
            >
              <svg className="absolute inset-0 w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
                <circle ref={svgCircleRef} cx="50" cy="50" r="48" fill="none" stroke="white" strokeWidth="1.5" className="opacity-80 group-hover:opacity-100 transition-opacity" />
              </svg>
              <div ref={playIconRef} className="relative z-10 flex items-center justify-center w-full h-full rounded-full group-hover:bg-white group-hover:text-black transition-colors duration-500">
                <Play className="ml-0.5 w-4 h-4 sm:w-6 sm:h-6 md:w-10 md:h-10" fill="currentColor" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-2 sm:p-4">
            <button onClick={() => setIsVideoOpen(false)} className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-[110]"><X size={32}/></button>
            <div className="w-full max-w-6xl aspect-video rounded-lg overflow-hidden shadow-2xl border border-white/10 bg-black">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/QPhlxyc212I?autoplay=1" allow="autoplay; encrypted-media" allowFullScreen className="w-full h-full"></iframe>
            </div>
        </div>
      )}
    </div>
  );
};

export default AbbadHero;