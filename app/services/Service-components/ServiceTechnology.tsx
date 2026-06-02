"use client";

import { Cpu, Microscope, Monitor, Scan, Activity, Radar, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface ServiceTechnologyProps {
  technologyUsed: string[];
}

const TECH_ICONS = [Scan, Microscope, Monitor, Activity, Radar, Cpu];

export default function ServiceTechnology({ technologyUsed = [] }: ServiceTechnologyProps) {
  return (
    <section className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 bg-transparent">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 md:mb-10"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#3563A8]/5 border border-[#3563A8]/10 shadow-sm mb-4">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#3563A8]" />
            <span className="text-[#3563A8] text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-wider font-outfit">
              Technology & Equipment
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-playfair text-slate-900 mb-3 md:mb-4 leading-tight">
            Advanced Technology <span className="text-[#3563A8]">Used</span>
          </h2>
          <p className="text-slate-600 font-outfit max-w-2xl mx-auto text-base md:text-lg lg:text-xl leading-relaxed px-4 md:px-0">
            We utilize state-of-the-art diagnostic and clinical equipment to plan and execute treatments with absolute precision.
          </p>
        </motion.div>

        {/* Technology Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {technologyUsed.map((tech, index) => {
            const TechIcon = TECH_ICONS[index % TECH_ICONS.length];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white/60 backdrop-blur-sm border border-slate-100/60 p-5 rounded-2xl flex items-center gap-4 shadow-sm hover:shadow-md hover:bg-white hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#3563A8]/5 border border-[#3563A8]/10 text-[#3563A8] group-hover:bg-[#3563A8] group-hover:text-white transition-colors duration-300 flex items-center justify-center flex-shrink-0">
                  <TechIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <p className="font-outfit font-semibold text-slate-700 leading-relaxed text-sm group-hover:text-slate-900 transition-colors">
                  {tech}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
