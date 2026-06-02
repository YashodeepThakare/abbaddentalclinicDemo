"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Plus, Sparkles } from 'lucide-react';

// --- DATA ---
const equipmentData = [
  { 
    id: 1, 
    title: "Intraoral Scanner", 
    category: "Diagnostics",
    src: "/assets/photo/DentalScanner.png", 
    desc: "Replaces messy impressions with high-precision 3D digital mapping. We generate a perfect replica of your teeth in minutes for accurate crown and aligner fitting."
  },
  { 
    id: 2, 
    title: "Digital Radiography", 
    category: "Imaging",
    src: "/assets/photo/DigitalxRay.png", 
    desc: "Ultra-low radiation imaging that provides instant, crystal-clear views of tooth structure. Allows for immediate diagnosis of hidden decay and bone loss."
  },
  { 
    id: 3, 
    title: "Surgical Loupes", 
    category: "Precision",
    src: "/assets/photo/DentalLoup.png", 
    desc: "Microscopic magnification allows our specialists to work with sub-millimeter precision, preserving more healthy tooth structure during restorative procedures."
  },
  { 
    id: 4, 
    title: "CBCT 3D Scan", 
    category: "Advanced Surgery",
    src: "/assets/photo/cbct.png", 
    desc: "A complete 3D view of your jaw, nerves, and sinuses. Essential for safe implant planning and complex root canal treatments."
  }
];

// --- HELPER FOR TYPING/REVEAL ---
const FadeInText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className="inline-block"
    >
      {text}
    </motion.span>
  );
};

export default function EquipmentsCreative() {
  const [activeId, setActiveId] = useState(1);
  const activeItem = equipmentData.find(item => item.id === activeId) || equipmentData[0];

  return (
    <section className="relative w-full py-16 md:py-24 lg:py-12 bg-[#050505] text-white overflow-hidden">
      {/* --- AMBIENT GLOWS --- */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#FA5424]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#3563A8]/5 blur-[120px] rounded-full pointer-events-none" />

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Manrope:wght@300;400;600&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-manrope { font-family: 'Manrope', sans-serif; }
      `}} />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 lg:mb-24 border-b border-white/10 pb-10">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[1px] w-12 bg-[#3563A8]"></span>
              <span className="h-2 w-2 rounded-full bg-[#FA5424]"></span>
              <span className="text-[#3563A8] font-manrope text-xs tracking-[0.3em] uppercase font-bold">
                Our Technology
              </span>
            </div>

            {/* Combined Title in Single Line */}
           <h2 className="font-playfair text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-none text-white tracking-tighter">
  <span className="block overflow-hidden">
    <FadeInText text="Precision" />
    <span className="italic text-white/40 ml-3">
      <FadeInText text="Instruments" delay={0.2} />
    </span>
  </span>
</h2>

          </div>

          <div className="md:max-w-xs space-y-4">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-400 font-manrope text-sm leading-relaxed"
            >
              We utilize state-of-the-art diagnostic and surgical tools to ensure every procedure is minimally invasive and maximally effective.
            </motion.p>
          </div>
        </div>

        {/* --- INTERACTIVE SHOWCASE --- */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* LEFT: VISUAL DISPLAY */}
          <div className="relative h-[350px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-[#111] border border-white/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, scale: 1.05, clipPath: 'inset(100% 0 0 0)' }}
                animate={{ opacity: 1, scale: 1, clipPath: 'inset(0% 0 0 0)' }}
                exit={{ opacity: 0, scale: 0.95, clipPath: 'inset(0 0 100% 0)' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 w-full h-full"
              >
                <img 
                  src={activeItem.src} 
                  alt={activeItem.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                
                {/* Floating Info Badge in Image */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="absolute bottom-8 left-8 flex items-center gap-4"
                >
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <Sparkles size={14} className="text-[#FA5424]" />
                      <span className="font-manrope text-[10px] font-bold tracking-widest uppercase text-[#FA5424]">
                        {activeItem.category}
                      </span>
                    </div>
                    <h4 className="font-playfair text-xl text-white mt-0.5">{activeItem.title}</h4>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
            
            {/* Texture Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-20 z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          </div>

          {/* RIGHT: INTERACTIVE LIST */}
          <div className="flex flex-col justify-center lg:pl-10">
            <div className="space-y-4">
              {equipmentData.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <div 
                    key={item.id}
                    onMouseEnter={() => setActiveId(item.id)}
                    onClick={() => setActiveId(item.id)}
                    className="group cursor-pointer border-b border-white/5 pb-6 lg:pb-8"
                  >
                    <div className="flex items-center justify-between transition-all duration-500">
                      <div className="flex items-center gap-5">
                        <span className={`font-manrope text-xs font-bold transition-colors duration-300 ${isActive ? 'text-[#FA5424]' : 'text-white/20'}`}>
                          0{item.id}
                        </span>
                        <h3 className={`font-playfair text-2xl md:text-3xl lg:text-4xl transition-all duration-500 origin-left ${isActive ? 'translate-x-3 text-white' : 'text-white/40 group-hover:text-white/70'}`}>
                          {item.title}
                        </h3>
                      </div>
                      
                      <div className="relative w-8 h-8 flex items-center justify-center">
                        <motion.div
                          animate={{ 
                            rotate: isActive ? 0 : -90, 
                            opacity: isActive ? 1 : 0,
                            scale: isActive ? 1 : 0.5
                          }}
                          className="absolute text-[#FA5424]"
                        >
                          <ArrowRight size={24} />
                        </motion.div>
                        <motion.div
                          animate={{ 
                            rotate: isActive ? 90 : 0, 
                            opacity: isActive ? 0 : 1,
                            scale: isActive ? 0.5 : 1
                          }}
                          className="absolute text-white/20"
                        >
                          <Plus size={24} />
                        </motion.div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "circOut" }}
                          className="overflow-hidden"
                        >
                          <div className="flex gap-4 pt-4 pl-10">
                            <div className="w-[2px] bg-[#FA5424] shrink-0" />
                            <p className="font-manrope text-gray-400 text-sm md:text-base leading-relaxed max-w-md">
                              {item.desc}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}