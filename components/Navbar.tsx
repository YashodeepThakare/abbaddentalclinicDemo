"use client";
import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import Image from "next/image";

const FullscreenMenu = dynamic(() => import("./FullscreenMenu"), {
  ssr: false,
  loading: () => null,
});

type NavbarProps = {
  variant?: "default" | "dark";
};

export default function Navbar({ variant = "default" }: NavbarProps) {
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [isMenuMounted, setIsMenuMounted] = useState(false);

  useEffect(() => {
    const btn = menuButtonRef.current;
    if (btn) {
      gsap.fromTo(
        btn,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: "power3.out" }
      );
    }
  }, []);

  const handleButtonMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = menuButtonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: "power2.out" });
  };

  const handleButtonLeave = () => {
    if (menuButtonRef.current) {
      gsap.to(menuButtonRef.current, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    }
  };

  const handleButtonEnter = () => {
    if (menuButtonRef.current) {
      gsap.to(menuButtonRef.current, { scale: 1.05, duration: 0.3 });
    }
  };

  const buttonClass =
    variant === "dark"
      ? "pointer-events-auto px-6 py-2.5 md:px-10 md:py-4 bg-slate-900/80 backdrop-blur-md border border-white/20 text-white text-xs md:text-sm font-bold uppercase tracking-widest rounded-full shadow-2xl hover:bg-black hover:border-white/30 transition-all duration-300 font-outfit"
      : "pointer-events-auto px-6 py-2.5 md:px-10 md:py-4 bg-slate-900 text-white text-xs md:text-sm font-bold uppercase tracking-widest rounded-full shadow-2xl hover:bg-black transition-colors font-outfit";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-12 pointer-events-none">
        <nav className="max-w-[1400px] mx-auto h-[80px] md:h-[100px] flex items-center justify-between">

          <a href="/" aria-label="Abbad Dental Clinic Home" className="pointer-events-auto block relative">
            <div className="w-[100px] h-[100px] md:w-[150px] md:h-[150px]">
              <Image
                src="/assets/photo/mainlogo.webp"
                alt="Abbad Dental Clinic Logo"
                width={150}
                height={150}
                priority
                className="object-contain w-full h-full"
              />
            </div>
          </a>

          <button
            ref={menuButtonRef}
            style={{ opacity: 0 }}
            onClick={() => setIsMenuMounted(true)}
            onMouseMove={handleButtonMove}
            onMouseEnter={handleButtonEnter}
            onMouseLeave={handleButtonLeave}
            aria-label="Open navigation menu"
            className={buttonClass}
          >
            Menu
          </button>
        </nav>
      </header>

      {isMenuMounted && (
        <FullscreenMenu onCloseComplete={() => setIsMenuMounted(false)} />
      )}
    </>
  );
}
