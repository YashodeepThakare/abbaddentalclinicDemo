"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface ServiceProcedureProps {
  procedure: string[];
}

export default function ServiceProcedure({
  procedure = [],
}: ServiceProcedureProps) {
  return (
    <section
      id="procedure"
      className="relative py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-12 lg:px-16 bg-transparent overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 md:mb-12"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#3563A8]/5 border border-[#3563A8]/10 shadow-sm mb-5 sm:mb-6">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#3563A8]" />
            <span className="text-[#3563A8] text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-wider font-outfit">
              Step by Step
            </span>
          </div>

          <div className="flex flex-col lg:flex-row justify-between gap-6 md:gap-10 lg:gap-16 lg:items-end">
            <h2 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold font-playfair text-slate-900 leading-[1.15] shrink-0">
              <span className="whitespace-nowrap">Our Treatment</span>
              <span className="block text-[#3563A8]">Process</span>
            </h2>

            <p className="text-slate-600 font-outfit text-base sm:text-lg xl:text-xl leading-relaxed max-w-2xl lg:max-w-xl xl:max-w-2xl">
              A carefully guided treatment journey designed to keep every stage
              clear, comfortable, and clinically precise from consultation to
              final care.
            </p>
          </div>
        </motion.div>

        {/* Desktop Premium Layout */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-6 gap-x-6 xl:gap-x-12 gap-y-12 xl:gap-y-16">
            {procedure.map((step, index) => {
              const number = String(index + 1).padStart(2, "0");

              const total = procedure.length;
              const remainder = total % 3;
              const isLastItem = index === total - 1;
              const isSecondLastItem = index === total - 2;

              let centerClass = "col-span-2";

              // Last row has only 1 item => center it
              if (remainder === 1 && isLastItem) {
                centerClass = "col-span-2 col-start-3";
              }

              // Last row has 2 items => center both
              if (remainder === 2 && isSecondLastItem) {
                centerClass = "col-span-2 col-start-2";
              }

              if (remainder === 2 && isLastItem) {
                centerClass = "col-span-2 col-start-4";
              }

              return (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 35,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`group relative ${centerClass}`}
                >
                  {/* Top connector */}
                  <div className="relative mb-5 flex items-center gap-5">
                    <motion.span
                      initial={{ width: 0 }}
                      whileInView={{ width: 64 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.7,
                        delay: index * 0.06,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="h-[2px] rounded-full bg-[#3563A8]"
                    />

                    <span className="text-[11px] xl:text-xs font-bold font-outfit uppercase tracking-[0.25em] text-[#FA5424]">
                      Step {number}
                    </span>
                  </div>

                  {/* Step body */}
                  <div className="relative pl-16 xl:pl-24">
                    {/* Big Number - darkened */}
                    <div className="absolute left-0 top-0">
                      <span className="block font-playfair text-5xl xl:text-7xl font-bold leading-none text-slate-700/80 transition-all duration-500 group-hover:text-[#3563A8] group-hover:-translate-y-1">
                        {number}
                      </span>
                    </div>

                    {/* Text */}
                    <p className="pt-2 text-base xl:text-xl font-semibold font-outfit leading-relaxed text-slate-600 transition-colors duration-300 group-hover:text-[#3563A8]">
                      {step}
                    </p>

                    {/* Bottom animated line */}
                    <div className="mt-6 xl:mt-8 h-[1px] w-full bg-slate-200 overflow-hidden">
                      <span className="block h-full w-0 bg-gradient-to-r from-[#3563A8] to-[#FA5424] transition-all duration-700 group-hover:w-full" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile + Tablet Layout */}
        <div className="lg:hidden relative mt-6 sm:mt-10">
          {/* Vertical Track */}
          <div className="absolute left-[19px] sm:left-[23px] top-0 bottom-0 w-[2px] bg-slate-100" />

          {/* Animated Vertical Line */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-[19px] sm:left-[23px] top-0 w-[2px] bg-[#3563A8]"
          />

          <div className="space-y-8 sm:space-y-10">
            {procedure.map((step, index) => {
              const number = String(index + 1).padStart(2, "0");

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 26 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative pl-16 sm:pl-20 md:pl-24 group"
                >
                  {/* Step Indicator Circle */}
                  <div className="absolute left-0 sm:left-1 top-0 w-10 h-10 sm:w-10 sm:h-10 rounded-full bg-white border-[1.5px] border-[#3563A8]/30 flex items-center justify-center shadow-[0_4px_10px_rgba(53,99,168,0.08)] group-hover:bg-[#3563A8] group-hover:border-[#3563A8] group-hover:shadow-[0_8px_18px_rgba(53,99,168,0.2)] transition-all duration-400 z-10">
                    <span className="text-sm sm:text-base font-bold font-outfit text-[#3563A8] group-hover:text-white transition-colors duration-400">
                      {index + 1}
                    </span>
                  </div>

                  {/* Step Label */}
                  <span className="block mb-2 text-xs sm:text-sm font-bold font-outfit uppercase tracking-[0.22em] text-[#FA5424]">
                    Step {number}
                  </span>

                  {/* Step Description */}
                  <p className="text-base sm:text-lg md:text-xl text-slate-700 font-medium font-outfit leading-relaxed group-hover:text-[#3563A8] transition-colors duration-300">
                    {step}
                  </p>

                  {/* Decorative underline */}
                  <span className="mt-4 sm:mt-5 block h-[2px] w-12 sm:w-16 rounded-full bg-[#3563A8]/20 transition-all duration-500 group-hover:w-24 sm:group-hover:w-32 group-hover:bg-[#FA5424]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}