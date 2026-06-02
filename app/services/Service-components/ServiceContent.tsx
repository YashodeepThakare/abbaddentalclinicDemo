"use client";

import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface ServiceContentProps {
  overview: string;
}

export default function ServiceContent({ overview }: ServiceContentProps) {
  return (
    <section id="overview" className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-12 lg:px-20 bg-transparent">
      <div className="max-w-[900px] mx-auto">
        {/* Centered Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 md:mb-8"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#3563A8]/5 border border-[#3563A8]/10 w-fit mx-auto mb-3 sm:mb-4">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#3563A8]" />
            <span className="text-[#3563A8] text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-wider font-outfit">
              About Treatment
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-playfair text-slate-900 leading-tight px-2">
            Clinical <span className="text-[#3563A8]">Overview</span>
          </h2>
        </motion.div>

        {/* Overview Text with Left Accent Border */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border-l-[3px] md:border-l-4 border-[#3563A8]/40 pl-5 sm:pl-6 md:pl-8 pr-2 sm:pr-0 mx-auto max-w-[850px]"
        >
          <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed md:leading-[1.8] font-outfit font-normal text-justify sm:text-left">
            {overview}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
