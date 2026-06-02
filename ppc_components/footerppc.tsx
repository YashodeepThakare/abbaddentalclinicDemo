"use client";

import React from 'react';
import { 
  Instagram, 
  Facebook, 
  Youtube, 
  MapPin,
  Clock,
  Phone,
  Linkedin,
  Twitter
} from 'lucide-react';

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

export default function SimpleFooter() {
  const socialLinks = [
    { Icon: Instagram, href: "https://www.instagram.com/abbaddentalclinic/", label: "Instagram" },
    { Icon: Facebook, href: "https://www.facebook.com/abbaddentalclinicnashik/", label: "Facebook" },
    { Icon: Youtube, href: "https://www.youtube.com/@abbaddentalclinicnashik", label: "Youtube" },
    { Icon: Linkedin, href: "https://www.linkedin.com/company/abbad-dental-clinic-and-implant-center/", label: "LinkedIn" },
    { Icon: Pinterest, href: "https://in.pinterest.com/abbaddentalclinic/", label: "Pinterest" },
    { Icon: Twitter, href: "https://x.com/ACenter75541", label: "Twitter" }
  ];

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Treatments", href: "#treatments" },
    { name: "Doctors", href: "#doctors" },
    { name: "Gallery", href: "#gallery" },
    { name: "Awards", href: "#awards" }
  ];

  return (
    <footer className="w-full bg-[#F2F0E9] text-[#1A1A1A] border-t border-black/5">
      {/* OPTIMIZATION: Removed the <style> @import tag. 
        You MUST ensure Syne and Inter are loaded in layout.tsx using next/font.
        This fixes the 150ms render-blocking delay.
      */}

      {/* --- MAIN FOOTER CONTENT --- */}
      <div className="bg-[#E9E6DC] pt-16 pb-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
            
            {/* About & Social */}
            <div className="lg:col-span-4">
              <h3 className="font-syne text-xl mb-4 uppercase tracking-tight font-bold">Abbad Dental Clinic</h3>
              <p className="font-outfit text-black/60 text-sm leading-relaxed max-w-xs mb-8">
                Transforming Nashik's smiles with MDS Gold Medalist expertise and artistic precision.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((link, i) => (
                  <a 
                    key={i}
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-black/10 bg-white/50 flex items-center justify-center hover:bg-[#3563A8] hover:text-white transition-all active:scale-90"
                    aria-label={link.label}
                  >
                    <link.Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Directory */}
            <div className="lg:col-span-3">
              <h4 className="font-outfit text-[10px] font-bold uppercase tracking-[0.4em] text-black/30 mb-6">Directory</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="font-syne text-xl font-bold uppercase hover:text-[#3563A8] transition-colors">{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Locations */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Branch 1 */}
              <div>
                <div className="flex items-center gap-2 mb-3 text-[#3563A8]">
                  <MapPin size={14} />
                  <span className="font-outfit text-[10px] font-bold uppercase tracking-widest">College Road</span>
                </div>
                <p className="font-outfit text-black/60 text-xs leading-relaxed mb-3">
                  2-3, Jubiliant Heights, near Nirman House, Vidya Vikas Circle, towards College road, Nashik - 422005
                </p>
                <a href="tel:+919713435111" className="font-outfit flex items-center gap-2 text-[#3563A8] font-bold text-sm">
                  <Phone size={12} /> +91 97134 35111
                </a>
              </div>

              {/* Branch 2 */}
              <div>
                <div className="flex items-center gap-2 mb-3 text-[#3563A8]">
                  <MapPin size={14} />
                  <span className="font-outfit text-[10px] font-bold uppercase tracking-widest">Panchavati</span>
                </div>
                <p className="font-outfit text-black/60 text-xs leading-relaxed mb-3">
                  2055, Dahi Pool, Nehru Chowk, next to Sandeep Cut Piece Center, Panchavati, Nashik - 422001
                </p>
                <a href="tel:+919923708233" className="font-outfit flex items-center gap-2 text-[#3563A8] font-bold text-sm">
                  <Phone size={12} /> +91 99237 08233
                </a>
              </div>
            </div>
          </div>

          {/* --- BOTTOM BAR --- */}
          <div className="mt-16 pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] font-bold text-black/40 tracking-[0.2em] uppercase font-outfit">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#3563A8]" />
              <span>© 2026 Abbad Dental Clinic</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock size={10} className="text-[#3563A8]" />
                <span>Mon - Sat: 9am - 8pm</span>
              </div>
              <span className="opacity-30 hidden md:block">|</span>
              <span className="text-center md:text-left">Design by Mastermind Web developers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}