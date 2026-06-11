"use client";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import servicesData from "../app/services/data/services.json";


interface FullscreenMenuProps {
  onCloseComplete: () => void;
}


export default function FullscreenMenu({ onCloseComplete }: FullscreenMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const [loadMap, setLoadMap] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  type MenuItem = { label: string; href: string; subItems?: { label: string; href: string }[] };
  const menuItems: MenuItem[] = [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#about" },
    {
      label: "Treatments",
      href: "/services"
    },
    { label: "Doctors", href: "#doctors" },
    { label: "Gallery", href: "#gallery" },
    { label: "Blogs", href: "/Blogs/blogs" },
    { label: "Awards", href: "#awards" },
    { label: "Contact", href: "#contact" },
  ];


  const socialLinks = [
    { name: "Facebook", href: "https://www.facebook.com/abbaddentalclinicnashik/", icon: "/assets/photo/facebook-svgrepo-com.svg" },
    { name: "Instagram", href: "https://www.instagram.com/abbaddentalclinic/", icon: "/assets/photo/instagram.svg" },
    { name: "YouTube", href: "https://www.youtube.com/@abbaddentalclinicnashik?themeRefresh=1", icon: "/assets/photo/youtube-svgrepo-com.svg" },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/abbad-dental-clinic-and-implant-center/", icon: "/assets/photo/linkedin.svg" },
    { name: "Pinterest", href: "https://in.pinterest.com/abbaddentalclinic/", icon: "/assets/photo/pinterest.svg" },
    { name: "Twitter", href: "https://x.com/ACenter75541", icon: "/assets/photo/twitter.svg" },
    { name: "Linktree", href: "https://linktr.ee/AbbadDentalClinic", icon: "/assets/photo/linktree.svg" },
  ];


  useEffect(() => {
    const mapTimer = setTimeout(() => setLoadMap(true), 500);


    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
      const linkTexts = linksContainerRef.current?.querySelectorAll(".menu-link-text");

      gsap.set(menuRef.current, { visibility: "visible" });
      gsap.set(overlayRef.current, { scaleY: 0, transformOrigin: "top" });

      if (linkTexts) {
        gsap.set(linkTexts, { y: 100, opacity: 0, skewY: 5 });
      }

      gsap.set(closeButtonRef.current, { y: -30, opacity: 0 });
      gsap.set(mapContainerRef.current, { scale: 0.95, opacity: 0, x: 30, clipPath: "inset(0% 100% 0% 0%)" });
      gsap.set([socialRef.current, footerRef.current], { y: 20, opacity: 0 });


      tl.to(overlayRef.current, { scaleY: 1, duration: 0.8, ease: "expo.inOut" });

      if (linkTexts) {
        tl.to(linkTexts, { y: 0, opacity: 1, skewY: 0, duration: 0.9, stagger: 0.05, ease: "power4.out" }, "-=0.4");
      }

      tl.to(closeButtonRef.current, { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }, "-=0.8")
        .to(mapContainerRef.current, { scale: 1, x: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power3.out" }, "-=0.7")
        .to([socialRef.current, footerRef.current], { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }, "-=0.8");
    }, menuRef);


    return () => {
      ctx.revert();
      clearTimeout(mapTimer);
    };
  }, []);


  const handleClose = () => {
    const linkTexts = linksContainerRef.current?.querySelectorAll(".menu-link-text");

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: onCloseComplete
    });

    if (linkTexts) {
      tl.to(linkTexts, { y: -80, opacity: 0, skewY: -5, duration: 0.5, stagger: 0.02, ease: "power2.in" });
    }

    tl.to([mapContainerRef.current, socialRef.current, footerRef.current, closeButtonRef.current], { opacity: 0, duration: 0.4 }, "-=0.4")
      .to(overlayRef.current, { scaleY: 0, duration: 0.8, ease: "expo.inOut", transformOrigin: "bottom" }, "-=0.2");
  };


  const handleLinkEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
    gsap.to(e.currentTarget, { x: 20, color: "#3563A8", duration: 0.4, ease: "power3.out" });
  };


  const handleLinkLeave = (e: React.MouseEvent<HTMLSpanElement>) => {
    gsap.to(e.currentTarget, { x: 0, color: "#ffffff", duration: 0.4, ease: "power3.out" });
  };


  return (
    <div ref={menuRef} data-theme="dark" className="fixed inset-0 z-[100] visible">
      <div ref={overlayRef} className="absolute inset-0 bg-black" />

      <button
        ref={closeButtonRef}
        onClick={handleClose}
        aria-label="Close menu"
        className="absolute top-6 right-6 md:top-8 md:right-8 px-6 py-3 md:px-8 md:py-3 text-white text-base md:text-lg font-medium border border-white/20 rounded-full hover:bg-white/10 transition-colors z-30"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        Close
      </button>


      {/* Navigation Links */}
      <div
        ref={linksContainerRef}
        className="absolute inset-y-0 left-0 w-full lg:w-[50%] flex flex-col px-8 md:px-20 lg:px-32 z-20 overflow-y-auto no-scrollbar pointer-events-auto py-28 md:py-32"
      >
        <div className="my-auto flex flex-col w-full">
          {menuItems.map((item, index) => {
            const isDropdown = !!item.subItems;
            const isOpen = openDropdown === item.label;

            const handleRouting = (href: string) => {
              handleClose();
              if (href.startsWith("#")) {
                if (pathname !== "/") {
                  router.push("/" + href);
                  setTimeout(() => {
                    if (href === "#home") {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    } else {
                      const target = document.querySelector(href);
                      if (target) target.scrollIntoView({ behavior: "smooth" });
                    }
                  }, 500); // 500ms safety wait for page to render before explicit scroll
                } else {
                  if (href === "#home") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } else {
                    const target = document.querySelector(href);
                    if (target) target.scrollIntoView({ behavior: "smooth" });
                  }
                }
              } else {
                router.push(href);
              }
            };

            return (
              <div key={index} className="menu-link-item overflow-hidden py-1 pointer-events-auto">
                {isDropdown ? (
                  <div className="flex flex-col">
                    <button
                      onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                      className="inline-flex items-center gap-4 group text-left"
                    >
                      <span
                        className="menu-link-text block text-4xl md:text-5xl lg:text-7xl font-light text-white uppercase tracking-tighter cursor-pointer"
                        style={{ fontFamily: "'DM Sans', sans-serif", lineHeight: 1.1, willChange: "transform" }}
                        onMouseEnter={handleLinkEnter}
                        onMouseLeave={handleLinkLeave}
                      >
                        {item.label}
                      </span>
                      <ChevronDown className={`w-8 h-8 md:w-10 md:h-10 text-white/50 transition-transform duration-300 ${isOpen ? 'rotate-180 text-white' : ''} menu-link-text`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 mt-4 mb-4' : 'max-h-0 opacity-0'}`}>
                      <div className="flex flex-col gap-3 pl-4 md:pl-8 border-l-2 border-[#3563A8] ml-2">
                        {item.subItems!.map((sub, subIdx) => (
                          <a
                            key={subIdx}
                            href={sub.href}
                            onClick={(e) => {
                              e.preventDefault();
                              handleRouting(sub.href);
                            }}
                            className="text-lg md:text-2xl text-white/70 hover:text-[#FA5424] transition-colors font-outfit uppercase tracking-wider block"
                          >
                            {sub.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <a
                    href={item.href.startsWith("#") && pathname !== "/" ? "/" + item.href : item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleRouting(item.href);
                    }}
                    className="inline-block group"
                  >
                    <span
                      className="menu-link-text block text-4xl md:text-5xl lg:text-7xl font-light text-white uppercase tracking-tighter cursor-pointer"
                      style={{ fontFamily: "'DM Sans', sans-serif", lineHeight: 1.1, willChange: "transform" }}
                      onMouseEnter={handleLinkEnter}
                      onMouseLeave={handleLinkLeave}
                    >
                      {item.label}
                    </span>
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>


      {/* Right Side: Map & Socials */}
      <div className="absolute top-1/2 -translate-y-1/2 right-20 hidden lg:flex flex-col items-end z-20 gap-8">
        <div
          ref={mapContainerRef}
          className="w-[450px] xl:w-[500px] aspect-4/3 rounded-4xl overflow-hidden shadow-2xl relative border-4 border-white/5 bg-gray-900 group"
        >
          {loadMap ? (
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3748.9765!2d73.762385!3d20.010997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddebd7e904d06d%3A0xa9915d276618b1a!2sAbbad%20Dental%20Clinic%20Nashik!5e0!3m2!1sen!2sin!4v1735549080000!5m2!1sen!2sin"
              className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              title="Abbad Dental Clinic Exact Location"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(90%) contrast(85%)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-white/20 animate-pulse">Loading Map...</span>
            </div>
          )}
          <div className="absolute inset-0 border-[3px] border-white/10 rounded-[28px] pointer-events-none z-10" />
          <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg z-20 transform transition-transform duration-300 hover:scale-[1.02]">
            <p className="text-gray-900 text-sm font-bold mb-1 uppercase tracking-wider" style={{ fontFamily: "'Outfit', sans-serif" }}>Visit Our Clinic</p>
            <p className="text-gray-700 text-xs leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>2-3, Jubiliant Heights, Vidya Vikas Circle,<br />College Rd, Nashik, Maharashtra 422005</p>
          </div>
        </div>

        <div ref={socialRef} className="flex gap-4">
          {socialLinks.map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 hover:border-white/60 hover:bg-white/10 transition-all duration-300 relative">
              <div className="w-5 h-5 relative">
                <Image src={s.icon} alt={s.name} fill sizes="20px" className="object-contain invert" />
              </div>
            </a>
          ))}
        </div>
      </div>


      <div ref={footerRef} className="absolute right-8 bottom-8 md:right-20 md:bottom-12 text-white text-sm z-30 flex gap-8" style={{ fontFamily: "'Outfit', sans-serif" }}>
        <p>© 2025 ABBAD DENTAL</p>
        <a href="/privacy" className="hover:text-white transition-colors">PRIVACY POLICY</a>
      </div>
    </div>
  );
}
