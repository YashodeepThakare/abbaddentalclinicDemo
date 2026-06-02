"use client";

import { Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface ServiceNeedProps {
  whoNeedsThis: string[];
}

export default function ServiceNeed({ whoNeedsThis = [] }: ServiceNeedProps) {
  return (
    <section className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-transparent">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-12 items-start">

          {/* Left Column: Heading and Context Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-4 lg:sticky lg:top-32"
          >
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#3563A8]/5 border border-[#3563A8]/10 shadow-sm w-fit">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#3563A8]" />
              <span className="text-[#3563A8] text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-wider font-outfit">Symptom Checklist</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-playfair text-slate-900 leading-tight">
              Who Needs This <br className="hidden sm:block" />
              <span className="text-[#3563A8]">Treatment?</span>
            </h2>

            <p className="text-slate-600 font-outfit text-lg leading-relaxed">
              Identify if you are experiencing any of these common dental concerns. A clinical consultation is recommended to confirm eligibility.
            </p>

            <div className="p-6 rounded-2xl bg-white/40 border border-slate-100/50 shadow-sm relative group overflow-hidden">
              {/* Subtle background element */}
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#FA5424]/5 rounded-full group-hover:scale-125 transition-transform duration-500"></div>

              <h4 className="font-bold text-slate-900 font-outfit text-base mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FA5424]"></span>
                Clinical Guidance
              </h4>
              <p className="text-sm text-slate-500 font-outfit leading-relaxed">
                Every smile is unique. If you experience one or more of these symptoms, a clinical evaluation helps determine the optimal restoration path.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Dynamic Symptom Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 mt-4 lg:mt-0">
            {whoNeedsThis.map((item, index) => {
              const formattedIndex = String(index + 1).padStart(2, "0");
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-white/60 backdrop-blur-sm border border-slate-100/60 p-5 rounded-2xl flex gap-4 items-start shadow-sm hover:shadow-md hover:bg-white hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#3563A8]/5 border border-[#3563A8]/10 text-[#3563A8] group-hover:bg-[#3563A8] group-hover:text-white transition-colors duration-300 flex items-center justify-center flex-shrink-0 font-outfit font-bold text-xs">
                    {formattedIndex}
                  </div>
                  <p className="font-outfit font-medium text-slate-700 leading-relaxed text-sm pt-0.5 group-hover:text-slate-900 transition-colors">
                    {item}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
